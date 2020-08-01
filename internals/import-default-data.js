// import { initializeFirebase, firestore } from './firebase-config';
// import data from '../docs/default-firebase-data.json';
const fbInitializer = require('./firebase-config');
// const firestore = require('./firebase-config');
const data = require('../docs/default-firebase-data.json');

const importSpeakers = (firestore) => {
  const speakers = data.speakers;
  if (!Object.keys(speakers).length) {
    return { resp: false, firestore: firestore };
  }
  console.log('\tImporting', Object.keys(speakers).length, 'speakers...');

  const batch = firestore.batch();

  Object.keys(speakers).forEach((speakerId, order) => {
    batch.set(firestore.collection('speakers').doc(speakerId), {
      ...speakers[speakerId],
      order,
    });
  });

  return batch.commit().then((results) => {
    console.log('\tImported data for', results.length, 'speakers');
    return { results: results, firestore: firestore };
  });
};

const importPreviousSpeakers = (firestore) => {
  const previousSpeakers = data.previousSpeakers;
  if (!Object.keys(previousSpeakers).length) {
    return { resp: false, firestore: firestore };
  }
  console.log('\tImporting', Object.keys(previousSpeakers).length, 'previous speakers...');

  const batch = firestore.batch();

  Object.keys(previousSpeakers).forEach((speakerId, order) => {
    batch.set(firestore.collection('previousSpeakers').doc(speakerId), {
      ...previousSpeakers[speakerId],
      order,
    });
  });

  return batch.commit().then((results) => {
    console.log('\tImported data for', results.length, 'previous speakers');
    return { results: results, firestore: firestore };
  });
};

const importTeam = (firestore) => {
  const teams = data.team;
  if (!Object.keys(teams).length) {
    return { resp: false, firestore: firestore };
  }
  console.log('\tImporting', Object.keys(teams).length, 'subteam...');

  const batch = firestore.batch();

  Object.keys(teams).forEach((teamId) => {
    batch.set(firestore.collection('team').doc(teamId), {
      title: teams[teamId].title,
    });

    teams[teamId].members.forEach((member, id) => {
      batch.set(
        firestore.collection('team').doc(`${teamId}`).collection('members').doc(`${id}`),
        member
      );
    });
  });

  return batch.commit().then((results) => {
    console.log('\tImported data for', results.length, 'documents');
    return { results: results, firestore: firestore };
  });
};

const importPartners = (firestore) => {
  const partners = data.partners;
  if (!Object.keys(partners).length) {
    return { resp: false, firestore: firestore };
  }
  console.log('\tImporting partners...');

  const batch = firestore.batch();

  Object.keys(partners).forEach((docId) => {
    batch.set(firestore.collection('partners').doc(docId), {
      title: partners[docId].title,
      order: partners[docId].order,
    });

    partners[docId].logos.forEach((item, id) => {
      batch.set(
        firestore
          .collection('partners')
          .doc(`${docId}`)
          .collection('items')
          .doc(`${id}`.padStart(3, 0)),
        item
      );
    });
  });

  return batch.commit().then((results) => {
    console.log('\tImported data for', results.length, 'documents');
    return { results: results, firestore: firestore };
  });
};

const importGallery = (firestore) => {
  const gallery = data.gallery;
  if (!Object.keys(gallery).length) {
    return { resp: false, firestore: firestore };
  }
  console.log('\tImporting gallery...');
  const batch = firestore.batch();

  Object.keys(gallery).forEach((docId) => {
    batch.set(firestore.collection('gallery').doc(`${docId}`.padStart(3, 0)), {
      url: gallery[docId],
      order: docId,
    });
  });

  return batch.commit().then((results) => {
    console.log('\tImported data for', results.length, 'images');
    return { results: results, firestore: firestore };
  });
};

const importBlog = (firestore) => {
  const blog = data.blog;
  if (!Object.keys(blog).length) {
    return { resp: false, firestore: firestore };
  }
  console.log('\tImporting blog...');
  const batch = firestore.batch();

  Object.keys(blog).forEach((docId) => {
    batch.set(firestore.collection('blog').doc(docId), blog[docId]);
  });

  return batch.commit().then((results) => {
    console.log('\tImported data for', results.length, 'blog posts');
    return { results: results, firestore: firestore };
  });
};

const importVideos = (firestore) => {
  const docs = data.videos;
  if (!Object.keys(docs).length) {
    return { resp: false, firestore: firestore };
  }
  console.log('\tImporting videos...');

  const batch = firestore.batch();

  Object.keys(docs).forEach((docId) => {
    batch.set(firestore.collection('videos').doc(`${docId}`.padStart(3, 0)), {
      ...docs[docId],
      order: docId,
    });
  });

  return batch.commit().then((results) => {
    console.log('\tImported data for', results.length, 'videos');
    return { results: results, firestore: firestore };
  });
};

const importTickets = (firestore) => {
  const docs = data.tickets;
  if (!Object.keys(docs).length) {
    return { resp: false, firestore: firestore };
  }
  console.log('\tImporting tickets...');

  const batch = firestore.batch();

  Object.keys(docs).forEach((docId) => {
    batch.set(firestore.collection('tickets').doc(`${docId}`.padStart(3, 0)), {
      ...docs[docId],
      order: docId,
    });
  });

  return batch.commit().then((results) => {
    console.log('\tImported data for', results.length, 'tickets');
    return { results: results, firestore: firestore };
  });
};

const importSessions = (firestore) => {
  const docs = data.sessions;
  if (!Object.keys(docs).length) {
    return { resp: false, firestore: firestore };
  }
  console.log('\tImporting sessions...');

  const batch = firestore.batch();

  Object.keys(docs).forEach((docId) => {
    batch.set(firestore.collection('sessions').doc(docId), docs[docId]);
  });

  return batch.commit().then((results) => {
    console.log('\tImported data for', results.length, 'sessions');
    return { results: results, firestore: firestore };
  });
};

const importSchedule = (firestore) => {
  const docs = data.schedule;
  if (!Object.keys(docs).length) {
    return { resp: false, firestore: firestore };
  }
  console.log('\tImporting schedule...');

  const batch = firestore.batch();

  Object.keys(docs).forEach((docId) => {
    batch.set(firestore.collection('schedule').doc(docId), {
      ...docs[docId],
      date: docId,
    });
  });

  return batch.commit().then((results) => {
    console.log('\tImported data for', Object.keys(docs).length, 'days');
    return { results: results, firestore: firestore };
  });
};

const importNotificationsConfig = async (firestore) => {
  const notificationsConfig = data.notifications.config;
  console.log('Migrating notifications config...');
  const batch = firestore.batch();

  batch.set(firestore.collection('config').doc('notifications'), notificationsConfig);

  return batch.commit().then((results) => {
    console.log('\tImported data for notifications config');
    return { results: results, firestore: firestore };
  });
};

fbInitializer.initializeFirebase()
  .then((data) => importBlog(data.firestore))
  .then((data) => importGallery(data.firestore))
  .then((data) => importNotificationsConfig(data.firestore))
  .then((data) => importPartners(data.firestore))
  .then((data) => importPreviousSpeakers(data.firestore))
  .then((data) => importSchedule(data.firestore))
  .then((data) => importSessions(data.firestore))
  .then((data) => importSpeakers(data.firestore))
  .then((data) => importTeam(data.firestore))
  .then((data) => importVideos(data.firestore))

  .then(() => {
    console.log('Finished');
    process.exit();
  })
  .catch((err) => {
    console.log(err);
    process.exit();
  });
