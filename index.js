import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const posts = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs", { posts: posts });
});

app.get("/post/:id", (req, res) => {
    const post = posts.find((post) => post.id === Number(req.params.id));

    if (post) {
        res.render("index.ejs", { posts: posts, post: post });
    } else {
        res.redirect("/");
    }
});

app.get("/delete/:id", (req, res) => {
    const indexToDelete = posts.findIndex((post) => post.id === Number(req.params.id));

    if (indexToDelete !== -1) {
        posts.splice(indexToDelete, 1);
    }

    res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
    const editedPost = posts.find((post) => post.id === Number(req.params.id));

    if (editedPost) {
        res.render("edit.ejs", { posts: posts, editedPost: editedPost });
    } else {
        res.redirect("/");
    }
});

app.post("/edit", (req, res) => {
    const indexToEdit = posts.findIndex((post) => post.id === Number(req.body.id));

    if (indexToEdit !== -1) {
        posts[indexToEdit].title = req.body.title;
        posts[indexToEdit].text = req.body.text;
    }

    res.redirect("/");
});

app.get("/add", (req, res) => {
    res.render("add.ejs", {});
});

app.post("/add", (req, res) => {
    const post = req.body;
    post.date = new Date().toISOString().substring(0, 10);

    if (posts.length === 0) {
        post.id = 1;
    } else {
        post.id = posts[posts.length - 1].id + 1;
    }
    posts.push(post);
    res.redirect('/')
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});