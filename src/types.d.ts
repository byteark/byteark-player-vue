import { ByteArkPlayerContainerError } from './utils';

import type videojs from '@types/video.js';
import type { VideoJsPlayer, VideoJsPlayerOptions } from '@types/video.js';

declare global {
  interface Window {
    bytearkPlayer: {
      canAutoplay(props: ByteArkPlayerOptions): Promise<AutoplayResult>;
      VIDEOJS_VERSION: string;
      VERSION: string;
      setup: ISetupPlayerFunction;
      init: ICreatePlayerFunction;
      initAsync?: ICreatePlayerFunction;
      isBrowserSupportDrm(): Promise<{ widevine: boolean; fairplay: boolean }>;
    };
  }
}

export interface ByteArkPlayer extends VideoJsPlayer {
  info: () => ByteArkPlayerInfo;
  skipIntroTime: (time: number) => void;
  qualityLevels: () => ByteArkPlayerQualityLevelItem[];
  qualityLevel: (levelIndex?: number, immediately?: boolean) => void | number;
  hasQualityLevels: () => boolean;
  isAutoQualityLevel: () => boolean;
  getAdBlock?: () => boolean;
  playAd?: (adTagUrl: string) => void;
  pauseAd?: () => void;
  skipAd?: () => void;
  getAdMetadata?: () => unknown;
}

export interface ByteArkPlayerInfo {
  player: string;
  version: string;
  videojsVersion: string;
  hash: string;
  plugins: ByteArkPlayerPlugins;
  options: ByteArkPlayerOptions;
}

export interface ByteArkPlayerQualityLevelItem {
  name: string;
  level: number;
  width?: number;
  height?: number;
  url: string;
}

export interface ByteArkPlayerSource extends videojs.Tech.SourceObject {
  /** The video title text */
  title?: string;

  /** The video ID for ByteArk Lighthouse implementation */
  videoId?: string;

  /** The url of an image to be displayed before the video starts */
  poster?: string;

  /** The metadata for ByteArk Lighthouse plugin */
  lighthouse?: Partial<ByteArkLighthouseSourceMetadata>;

  [key: string]: unknown;
}

export interface ByteArkPlayerError {
  code: string;
  message: string;
  fullErrorCode: string;
  errorDetailCode: string;
  originalError: Error;
}

export interface ByteArkPlayerContextMenuItem {
  label: string;
  listener: () => void;
}

export interface AutoplayResult {
  autoplay: boolean;
  muted: boolean;
}

export interface ByteArkPlayerOptions extends VideoJsPlayerOptions {
  autoplayResult_?: AutoplayResult;
  autoplayadsmuted?: boolean;
  autoSeekToLiveEdge?: boolean;
  closedCaptionButton?: boolean;
  sources?: ByteArkPlayerSource[];
  menu?: ByteArkPlayerContextMenuItem[];
  liveConcurrent?: {
    url: string;
    minValue?: number;
  };
  seekButtons?: boolean;
  share?: {
    url: string;
    listener: () => void;
  };
  skipIntroButton?: {
    time: number;
  };
  autoRotate?: boolean;
  errors?: {
    [key: string]: {
      imageUrl: string;
      message: string;
    };
  };
  plugins?: ByteArkPlayerPlugins;
  [key: string]: unknown;
}

export interface ByteArkPlayerPlugins {
  bytearkAds?: ByteArkAdsPluginOptions;
  bytearkLighthouse?: ByteArkLighthousePluginOptions;
  bytearkVolumeBooster?: ByteArkVolumeBoosterPluginOptions;
  bytearkRetentionChart?: ByteArkRetentionChartPluginOptions;
  bytearkStoryboard?: ByteArkStoryboardPluginOptions;
  [key: string]: unknown;
}

export interface ByteArkAdsPluginOptions {
  /**
   * A VAST ad tag url that is requested from the ad server
   */
  adTagUrl?: string;

  /**
   * A VAST 2.0 document to be used as the ads response instead of making a request through an ad tag url
   */
  adsResponse?: string;

  /**
   * Show the ad marker on the progress bar
   */
  showAdMarker?: boolean;

  /**
   *
   */
  ads?: Array<{
    /**
     * A VAST ad tag url that is requested from the ad server
     */
    adTagUrl?: string;

    /**
     * A VAST 2.0 document to be used as the ads response instead of making a request through an ad tag url
     */
    adsResponse?: string;

    /**
     * The time to show the ad value can be
     * - number: the time in seconds to show the ad
     * - 0: show the ad at the beginning of the video
     * - -1: show the ad at the end of the video
     * - 'pre': show the ad before the video
     * - 'post': show the ad after the video
     * - timecode: show the ad at the specific timecode format HH:MM:SS
     * - percentage: show the ad at the specific percentage of the video e.g. '50%' for mid-roll
     */
    time: number | string | 'pre' | 'post';
  }>;

  /**
   * Show the controls for JS ads
   */
  showControlsForJSAds?: boolean;

  /**
   * videojs-contrib-ads options
   * https://videojs.github.io/videojs-contrib-ads/integrator/options.html
   */
  contribAds?: unknown;

  /**
   * Google IMA options
   */
  googleIma?: {
    /**
     * Google IMA SDK settings
     * https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/reference/js/google.ima.ImaSdkSettings
     */
    imaSdkSettings?: unknown;

    /**
     * Google IMA SDK Ads Rendering Settings
     * https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/reference/js/google.ima.AdsRenderingSettings
     */
    adsRenderingSettings?: unknown;

    /**
     * Google IMA SDK Ads Request Settings
     * https://developers.google.com/interactive-media-ads/docs/sdks/html5/client-side/reference/js/google.ima.AdsRequest
     */
    adsRequestSettings?: unknown;
  };
}

export interface ByteArkLighthousePluginOptions {
  debug?: boolean;
  projectId: string;
  playbackStuckUi?: 'auto' | 'on' | 'off';
  checkPlaybackStuckTimeInterval?: number;
  [key: string]: unknown;
}

export interface ByteArkLighthouseSourceMetadata {
  user?: {
    userId?: string;
    age?: string;
    country?: string;
    city?: string;
    lat?: string;
    long?: string;
    gender?: string;
    nationality?: string;
    subscriptionPlan?: string;
    accountCreationDate?: string;
  };
  video?: {
    videoTitle?: string;
    seriesId?: string;
    seriesTitle?: string;
    season?: string;
    episode?: string;
    subEpisode?: string;
    duration?: string;
    publishedDate?: string;
    genres?: string;
    rating?: string;
  };
  custom?: {
    d1?: string;
    d2?: string;
    d3?: string;
    d4?: string;
    d5?: string;
    d6?: string;
    d7?: string;
    d8?: string;
    d9?: string;
    d10?: string;
  };
}

export interface ByteArkVolumeBoosterPluginOptions {
  debug?: boolean;
  multiplier: number;
  [key: string]: unknown;
}

export interface ByteArkRetentionChartPluginOptions {
  [key: string]: unknown;
}

export interface ByteArkStoryboardPluginOptions {
  width?: number;
  height?: number;
  defaultStoryboardSize?: string;
  autoDiscoverStoryboard?: boolean;
  [key: string]: unknown;
}

export interface ByteArkPlayerContainerProps {
  options: ByteArkPlayerOptions;
  customClass?: string;
  lazyload?: boolean;
  playerEndpoint?: string;
  playerServerEndpoint?: string;
  playerSlugId?: string;
  playerVersion?: string;
  playerJsFileName?: string;
  playerCssFileName?: string;
  createPlayerFunction?: ICreatePlayerFunction;
  setupPlayerFunction?: ISetupPlayerFunction;
  onPlayerLoaded?: IOnPlayerLoadedFunction;
  onPlayerLoadError?: IOnPlayerLoadErrorFunction;
  onPlayerSetup?: IOnPlayerSetupFunction;
  onPlayerSetupError?: IOnPlayerSetupErrorFunction;
  onPlayerCreated?: IOnPlayerCreatedFunction;
  onPlayerReady?: IOnPlayerReadyFunction;
}

export interface ByteArkPlayerContainerState {
  loaded: boolean;
  ready: boolean;
  error: ByteArkPlayerContainerError | null;
  showPlaceholder: boolean;
}

export type ICreatePlayerFunction = (
  node: HTMLMediaElement,
  options: ByteArkPlayerOptions,
  onReady: () => void,
) => ByteArkPlayer;

export type ISetupPlayerFunction = (
  /* Player's options */
  options: ByteArkPlayerOptions,

  /* Script/style loader function */
  loadScriptOrStyleFunction: (id: string, url: string, type: 'script' | 'style') => Promise<void>,

  /* options for load plugin from custom url */
  customOptions?: { [key: string]: unknown },
) => Promise<void>;

export type IOnPlayerCreatedFunction = (player: ByteArkPlayer) => void;

export type IOnPlayerLoadedFunction = () => void;

export type IOnPlayerLoadErrorFunction = (
  error: ByteArkPlayerContainerError,
  originalError: ByteArkPlayerError | unknown,
) => void;

export type IOnPlayerReadyFunction = (player: ByteArkPlayer) => void;

export type IOnPlayerSetupFunction = () => void;

export type IOnPlayerSetupErrorFunction = (
  error: ByteArkPlayerContainerError,
  originalError: ByteArkPlayerError | unknown,
) => void;

export interface ByteArkPlayerContainerEvents {
  (e: 'loaded'): void;
  (e: 'loaderror', error: ByteArkPlayerContainerError, originalError: ByteArkPlayerError | unknown): void;
  (e: 'setup'): void;
  (e: 'setuperror', error: ByteArkPlayerContainerError, originalError: ByteArkPlayerError | unknown): void;
  (e: 'created', player: ByteArkPlayer): void;
  (e: 'ready', player: ByteArkPlayer): void;
  (e: 'firstplay', player: ByteArkPlayer): void;
  (e: 'play', player: ByteArkPlayer, currentTime: number): void;
  (e: 'pause', player: ByteArkPlayer, currentTime: number): void;
  (e: 'ended', player: ByteArkPlayer): void;
  (e: 'timeupdate', player: ByteArkPlayer, currentTime: number): void;
  (e: 'seeking', player: ByteArkPlayer, currentTime: number): void;
  (e: 'seeked', player: ByteArkPlayer, currentTime: number): void;
  (e: 'waiting', player: ByteArkPlayer): void;
  (e: 'stalled', player: ByteArkPlayer): void;
  (e: 'fullscreenchange', player: ByteArkPlayer, isFullscreen: boolean): void;
  (e: 'volumechange', player: ByteArkPlayer, volume: number): void;
  (e: 'ratechange', player: ByteArkPlayer, playbackSpeed: number): void;
  (e: 'enterpictureinpicture', player: ByteArkPlayer): void;
  (e: 'leavepictureinpicture', player: ByteArkPlayer): void;
  (e: 'error', player: ByteArkPlayer, error: ByteArkPlayerError | MediaError | unknown | null): void;
}
