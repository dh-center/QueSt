import RNFetchBlob from 'rn-fetch-blob';
import { QTS_API_ENDPOINT } from '@env';

/**
 * Helper class for interacting with quest-to-speech API
 */
class QTSApi {
  /**
   * Fetches audio file from text and returns path to it
   *
   * @param questId - quest id for identification
   * @param text - text to convert to audio
   */
  public async getAudio(questId: string, text: string): Promise<string> {
    const resp = await RNFetchBlob
      .config({
        fileCache: true,
        appendExt : 'mp3',
      })
      .fetch(
        'POST',
        `${QTS_API_ENDPOINT}/route_to_speech`,
        {},
        JSON.stringify({ /* eslint-disable @typescript-eslint/naming-convention */
          route_id: questId,
          ssml_text: text,
        }));

    return resp.path();
  }
}

export default new QTSApi();
