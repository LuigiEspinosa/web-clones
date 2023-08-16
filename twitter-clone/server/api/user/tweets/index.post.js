import formidable from "formidable";
import { createTweet } from "../../../db/tweets";
import { createMediaFile } from "../../../db/mediaFiles";
// import { tweetTransformer } from "../../../transformers/tweet";

export default defineEventHandler(async (event) => {
  const form = formidable({});

  const response = await new Promise((resolve, reject) => {
    form.parse(event.node.req, (err, fields, files) => {
      if (err) {
        reject(err);
      }

      resolve({ fields, files });
    });
  });

  const { fields, files } = response;
  const userId = event.context?.auth.user?.id;

  const tweetData = {
    text: fields.text[0],
    authorId: userId,
  };

  const tweet = await createTweet(tweetData);

  const filePromises = Object.keys(files).map(async (key) => {
    return createMediaFile({
      url: "",
      providerPublicId: "random_id",
      userId: userId,
      tweetId: tweet.id,
    });
  });

  await Promise.all(filePromises);

  return {
    // tweet: tweetTransformer(tweet),
    files,
  };
});
