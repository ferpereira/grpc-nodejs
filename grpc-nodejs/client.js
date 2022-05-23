const grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");
const PROTO_PATH = "./news.proto";

const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
};

var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);

const NewsService = grpc.loadPackageDefinition(packageDefinition).NewsService;

const client = new NewsService(
    "localhost:50051",
    grpc.credentials.createInsecure(),
);

client.getAllNews({}, (error, news) => {
    if(error) throw error;
    console.log(news);
  });

client.addNews(
    {
        title: "Title news 3",
        body: "Body content 3",
        postImage: "Image URL here",
    },
    (error, news) => {
        if(error) throw error;
        console.log("Sucessfully created a news.");
        console.log(news);
    }
);