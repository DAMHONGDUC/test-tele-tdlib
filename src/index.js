const { TDLib } = require("tdl-tdlib-addon");
const { getTdjson } = require("prebuilt-tdlib");
const { Client } = require("tdl");

console.log(getTdjson());

const client = new Client(new TDLib(getTdjson()), {
  apiId: 25852708,
  apiHash: "9d60537eae523bc3d72018fef2432597",
});

client.on("error", console.error);

async function main() {
  await client.login();

  const result = await client.invoke({
    _: "getChats",
    chat_list: { _: "chatListMain" },
    limit: 9000,
  });
  console.log(result);

  // get
  const chatByChatId = await client.invoke({
    _: "getChatHistory",
    chat_id: 5814706010,
    from_message_id: 1, // 0 - để lấy tin nhắn mới nhất
    offset: -99,
    limit: 100, // số lượng tin nhắn trả về luôn <= 100
    only_local: false,
  });
  console.log(JSON.stringify(chatByChatId));

  await client.close();
}

main().catch(console.error);
