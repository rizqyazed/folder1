// credit to josh vredevoogd for inspo and code on this :) such a cool way of doing this!

var page = document.getElementById("post-content")

// get each post from .md
const getNotes = async () => {
    const res = await fetch('../pages.json');
    var notes = await res.json();
    posts = []

    const getContent = notes.map((note, id) => {
        if (note.url) {

        // for each post
        return fetch(note.url)
            .then((res) => res.text())
            .then((text) => {
            // converts md to html
            content = markdown(text);
            posts.push([content, note.date, id, note.title, note.id])
            })
        }
    })
    // returns
    return Promise.all(getContent).then(() => {
        return posts
    });

}

const buildNotes = async () => {
  const posts = await getNotes();

  console.log('retrieving posts')

  // make sure in chronological order
  posts.sort((a, b) => a[2] - b[2])

  // render each post
  posts.map((note) => {
    // create post

    console.log(note)

    if (document.getElementsByTagName('body')[0].id == note[4]) {

        document.title = note[3]

        var div = document.createElement("div");
        div.classList.add('post')

        // create anchor
        var date = document.createElement("p");
        date.innerHTML = note[1];
        date.classList.add('date')
        div.appendChild(date)

        // create content
        var post = document.createElement("div");
        post.innerHTML = note[0];
        div.appendChild(post)

        page.appendChild(div)
    }

  })
}

buildNotes();
