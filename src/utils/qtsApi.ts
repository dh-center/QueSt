import RNFetchBlob from 'rn-fetch-blob';

/**
 *
 */
class QTSApi {
  /**
   * @param text
   */
  public async getAudio(questId: string, text: string): Promise<string> {
    // console.log(text)
    const resp = await RNFetchBlob
      .config({
        fileCache: true,
        appendExt : 'mp3',
      })
      .fetch(
        'POST',
        'https://qts.dh-center.ru/route_to_speech',
        {},
        JSON.stringify({ /* eslint-disable @typescript-eslint/naming-convention */
          route_id: questId,
          ssml_text: text,
        }));

    return resp.path();
  }
}

export default new QTSApi();
