var queryParams = new URLSearchParams(window.location.search);
var blogId = queryParams.get("id");

if (blogId !== null) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "blogs.json", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var blogs = JSON.parse(xhr.responseText);
            displayBlogDetails(blogs[blogId]);
        }};
    xhr.send();
}
else{
    window.location.href = "../../index.html";
}
    function displayBlogDetails(blog) {
    var blogDetails = document.getElementById("blogDetails");

    var titleElement = document.createElement("h3");
    titleElement.classList.add("blog-title");
    titleElement.textContent = blog.title;

    var imageElement = document.createElement("img");
    imageElement.classList.add("top-image");
    imageElement.src = blog.image;

    var imageElement2 = document.createElement("img");
    imageElement2.classList.add("top-image");
    imageElement2.src = blog.image2;

    var thelikes = document.createElement("div");

    var likeicon = document.createElement("div");
    likeicon.innerHTML = '<i class="far fa-thumbs-up"></i>';
    
    var likeval = document.createElement("span");
    
    likeval.innerText = "Likes: " + parseInt(blog.likes);



    var authorElement = document.createElement("b");
    authorElement.classList.add("blog-author");
    authorElement.textContent = "By: " + blog.author;
    
    var timestampElement = document.createElement("i");
    timestampElement.classList.add("blog-timestamp");
    timestampElement.textContent = "Posted on: " + blog.timestamp;

    var contentElement = document.createElement("div");
    contentElement.classList.add("blog-content");

    var helloDiv = document.createElement("div");
    helloDiv.classList.add("space");
    helloDiv.appendChild(timestampElement);
    helloDiv.appendChild(authorElement);

        var paragraph = document.createElement("p");
        paragraph.innerHTML = blog.content;
        contentElement.appendChild(paragraph);

    blogDetails.appendChild(titleElement);
    
    blogDetails.appendChild(helloDiv);

    blogDetails.appendChild(imageElement);

    blogDetails.appendChild(contentElement);

    blogDetails.appendChild(contentElement);

    thelikes.appendChild(likeicon);

    thelikes.appendChild(likeval);

    likeicon.addEventListener("click", function(){
      if (document.cookie.indexOf("functionRun=true") >= 0 && document.cookie.indexOf(window.location.href) >= 0) {
        alert("You have already given feedback on this page.");
      } else {
        document.cookie = "functionRun=true; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT";
        document.cookie = "visitedPage=" + window.location.href + "; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT";
      
        blog.likes = parseInt(blog.likes) + 1;
        likeval.innerText = "Likes: " + parseInt(blog.likes);
        likeicon.innerHTML = '<i class="fas fa-thumbs-up"></i>';
        thelikes.appendChild(likeval);
      }
      
    
    saveDataToJSON(blogId, blog.likes);
    function saveDataToJSON(blogId, newData) {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          console.log("Data saved successfully!");
        }
      };
    
      var params = "blogId=" + encodeURIComponent(blogId) + "&newData=" + encodeURIComponent(JSON.stringify(newData));
      xhr.open("POST", "sav.php");
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send(params);
      console.log(blogId, newData);
    }
    
  })
    function displayBlog(blogg, z) {
      if (blogg.visibility !== "hidden" && blogg.visibility !== "hide" && blogg.visibility !== "Hide" && blogg.visibility !== "Hidden") {
        var blogContainer = document.getElementById("recommendations");
  
        var titleElement = document.createElement("h2");
        titleElement.textContent = blogg.title;

        var anchor = document.createElement("a");
        anchor.href = "blog_details.html?id=" + z;

        anchor.appendChild(titleElement);
        blogContainer.appendChild(anchor);
      }
      }  
    if (blog.image2 !== '' && blog.image2 !== null) {
        blogDetails.appendChild(imageElement2);
      }

    blogDetails.appendChild(thelikes);


      fetch('blogs.json')
  .then(response => response.json())
  .then(data => {
    var visibleBlogs = data.filter(blog => blog.visibility !== "hidden" && blog.visibility !== "hide" && blog.visibility !== "Hide" && blog.visibility !== "Hidden");
    var blogData1 = visibleBlogs[visibleBlogs.length - 1];
    var blogData2 = visibleBlogs[visibleBlogs.length - 2];
    var blogData3 = visibleBlogs[visibleBlogs.length - 3];
    a = visibleBlogs.length - 1;
    b = visibleBlogs.length - 2;
    c = visibleBlogs.length - 3;
    if (blogData1.title == blog.title) {
      var blogData1 = visibleBlogs[visibleBlogs.length - 2];
      a = visibleBlogs.length - 2;
      var blogData2 = visibleBlogs[visibleBlogs.length - 3];
      b = visibleBlogs.length - 3;
      var blogData3 = visibleBlogs[visibleBlogs.length - 4];
      c = visibleBlogs.length - 4;
      displayBlog(blogData1, a);
      displayBlog(blogData2, b);
      displayBlog(blogData3, c);
    } else if (blogData2.title == blog.title) {
      var blogData1 = visibleBlogs[visibleBlogs.length - 1];
      a = visibleBlogs.length - 1;
      var blogData2 = visibleBlogs[visibleBlogs.length - 3];
      b = visibleBlogs.length - 3;
      var blogData3 = visibleBlogs[visibleBlogs.length - 4];
      c = visibleBlogs.length - 4;
      displayBlog(blogData1, a);
      displayBlog(blogData2, b);
      displayBlog(blogData3, c);
    } else if (blogData3.title == blog.title) {
      var blogData1 = visibleBlogs[visibleBlogs.length - 1];
      a = visibleBlogs.length - 1;
      var blogData2 = visibleBlogs[visibleBlogs.length - 2];
      b = visibleBlogs.length - 2;
      c = visibleBlogs.length - 4;
      var blogData3 = visibleBlogs[visibleBlogs.length - 4];
      displayBlog(blogData1, a);
      displayBlog(blogData2, b);
      displayBlog(blogData3, c);
    } else {
      displayBlog(blogData1, a);
      displayBlog(blogData2, b);
      displayBlog(blogData3, c);
    }
  });
}
