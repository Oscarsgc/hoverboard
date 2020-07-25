import '@power-elements/lazy-image';
import { css, customElement, html, property } from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map';
import { uiActions } from '../redux/actions';
import { ThemedElement } from './themed-element';

@customElement('hero-block')
export class HeroBlock extends ThemedElement {
  @property({ type: Boolean })
  active = false;
  @property({ type: String, attribute: 'background-image' })
  backgroundImage = '';
  @property({ type: String, attribute: 'background-video' })
  backgroundVideo = '';
  @property({ type: String, attribute: 'background-color' })
  backgroundColor = '#fff';
  @property({ type: String, attribute: 'font-color' })
  fontColor = '#000';
  @property({ type: Boolean, attribute: 'hide-logo' })
  hideLogo = false;

  static get styles() {
    return [
      ...super.styles,
      css`
        :host {
          margin-top: -56px;
          border-bottom: 1px solid var(--divider-color);
        }

        .hero-block {
          height: 100%;
          position: relative;
          color: inherit;
        }

        .hero-overlay {
          background-color: rgba(238, 248, 207, 0.1);
          opacity: 0;
          transition: opacity 0.3s;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          position: absolute;
        }

        .hero-overlay[show] {
          opacity: 1;
        }

        .hero-image {
          transition: background-color 0.3s;
          position: absolute;
          --lazy-image-fit: cover;
        }

        .video-wrapper{
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          overflow: hidden;
          background-color: var(--primary-background-color);
        }

        .video-bg {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.8;
        }

        #backgroundVideo{
          position: absolute;
          right: 0;
          bottom: 0;
          min-width: 100%; 
          min-height: 100%;
        }

        .content {
          padding: 0;
          width: 100%;
          height: unset;
          z-index: 0;
          position: unset;
        }

        .hero-content {
          padding: 80px 32px 32px;
          position: unset;
        }

        div ::slotted(.hero-title) {
          margin: 30px 0;
          font-size: 40px;
        }

        div ::slotted(.hero-description) {
          margin-bottom: 30px;
          max-width: 600px;
        }

        @media (min-width: 812px) {
          :host {
            margin-top: -64px;
          }

          .hero-content {
            padding-top: 120px;
            padding-bottom: 60px;
          }
        }
      `,
    ];
  }

  render() {
    return html`
      <div
    class="hero-block"
    style="${styleMap({ color: this.fontColor })}"    layout    start
    vertical
    center-justified
    >
        ${this.backgroundVideo && this.video}
        <div class="hero-overlay" ?show="${!!this.backgroundVideo}" fit></div>
        <div class="content">
          <div class="hero-content">
            <slot></slot>
          </div>
        </div>
      </div>
      <slot name="bottom"></slot>
    `;
  }

  private get image() {
    return html`
      <lazy-image
        class="hero-image"
        src="${this.backgroundImage}"
        style="${styleMap({ backgroundColor: this.backgroundColor })}"
        fit
      ></lazy-image>
    `;
  }

  private get video() {
    return html`        
      <video id="backgroundVideo" class="video-bg load-complete" autoplay muted loop>
        <source src="${this.backgroundVideo}" type="video/mp4">
      </video>
    `;
  }

  updated(changedProperties: import('lit-element').PropertyValues) {
    super.updated(changedProperties);
    if (this.active) {
      uiActions.setHeroSettings({
        backgroundImage: this.backgroundImage,
        backgroundColor: this.backgroundColor,
        fontColor: this.fontColor,
        hideLogo: this.hideLogo,
      });
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'hero-block': HeroBlock;
  }
}
