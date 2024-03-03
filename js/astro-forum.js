const loadingPosts = document.getElementById('loading-posts');

// ------------ Mark as read -------------
const readPostTitle = document.getElementById('read-post-title-container');
let readPostMarkCount = 0;

const readMarkClick = (postTitle,view_count) => {

  let title = postTitle.split("---").join("'");
  console.log(postTitle);

  const postRead = document.createElement('div');
  postRead.classList = `flex flex-col lg:flex-row gap-2 justify-between items-start lg:items-center bg-white p-5 my-2 rounded-2xl`;
  postRead.innerHTML = `
      <p class="font-medium">${title}</p>
      <p class="flex gap-2 pr-2">
        <img src="/images/icons/view.svg" alt="">
        <span>${view_count}</span>
      </p>
    `;
  readPostTitle.appendChild(postRead);
  readPostMarkCount++;
  document.getElementById('read-post-count').innerText=`(${readPostMarkCount})`;
}


const postsLoad = async (searchText = '') => {
  const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`);
  const data = await res.json();
  const posts = data.posts;
  loadingPosts.classList.remove('hidden');
  displayPosts(posts);
}

const displayPosts = posts => {
  const postsContainer = document.getElementById('postsContainer');
  postsContainer.innerHTML = '';

  posts.forEach(post => {
    let active = '';
    post.isActive ? active = 'bg-[#10B981]' : active = 'bg-[#FF3434]';

    const postCard = document.createElement('div');
    postCard.classList = `flex flex-col lg:flex-row bg-[#F3F3F5] p-8 rounded-2xl gap-5 border-2 border-[#F3F3F5] hover:border-[#10B981] hover:bg-[#10b98115]`;
    let postTitle = post.title.split("'").join('---');
    postCard.innerHTML = `
    <!-- Card Left -->
    <div class="flex gap-4 items-center lg:items-start">
      <div class="relative">
        <div class="w-24 rounded-2xl overflow-hidden">
          <img src="${post.image}" alt="">
        </div>
        <div id="post-author-active"
          class="w-4 h-4 lg:w-6 lg:h-6 absolute -top-1 -right-1 lg:-top-2 lg:-right-2 rounded-full ${active}">
        </div>
      </div>
      <p class="flex flex-col lg:hidden gap-3 lg:gap-10 font-medium">
        <span>#${post.category}</span>
        <span>Author : ${post.author.name}</span>
      </p>
    </div>
    <!-- Card Right -->
    <div class="flex flex-col gap-3">
      <p class="flex hidden lg:block gap-3 lg:gap-10 font-medium">
        <span>#${post.category}</span>
        <span>Author : ${post.author.name}</span>
      </p>
      <h3 class="font-bold text-2xl lg:text-3xl">${post.title}</h3>
      <p>${post.description}</p>
      <hr class="border-dashed border-2">
      <div class="flex gap-3 justify-between">
        <div class="flex gap-3 lg:gap-5">
          <div class="flex gap-2">
            <img src="/images/icons/comment.svg" alt="">
            <span>${post.comment_count}</span>
          </div>
          <div class="flex gap-2">
            <img src="/images/icons/view.svg" alt="">
            <span>${post.view_count}</span>
          </div>
          <div class="flex gap-2">
            <img src="/images/icons/time.svg" alt="">
            <span>${post.posted_time}</span>
          </div>
        </div>
        <div>
          <div onclick="readMarkClick('${postTitle}','${post.view_count}')" class="mark-read">
            <img src="images/icons/read.png" alt="">
          </div>
        </div>
      </div>
    </div>
    `;
    postsContainer.appendChild(postCard);
  });
  loadingPosts.classList.add('hidden');
}

function handleSearch() {
  const searchText = document.getElementById('search-field').value;
  postsLoad(searchText);
};

setTimeout(postsLoad, 2000);

// ------------ Latest Posts ------------------
const loadingLatestPosts = document.getElementById('loading-latest-posts');

const latestPostsLoad = async () => {
  const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/latest-posts`);
  const data = await res.json();
  loadingLatestPosts.classList.remove('hidden');
  displayLatestPosts(data);
}

const displayLatestPosts = posts => {
  const postsContainer = document.getElementById('latest-posts-card');
  postsContainer.innerHTML = '';

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const postCard = document.createElement('div');
    postCard.classList = `flex flex-col lg:w-[33%] gap-3 border-2 p-4 rounded-3xl`;
    postCard.innerHTML = `
    <div>
      <img class="w-full rounded-3xl" src="${post.cover_image}" alt="">
    </div>
    <div class="flex gap-2">
      <img src="/images/icons/date.svg" alt="">
      <span>${post.author.posted_date || 'No publish date'}</span>
    </div>
    <h3 class="font-bold">${post.title}</h3>
    <p>${post.description}</p>
    <!-- Author Info -->
    <div>
      <div class="flex gap-3">
        <img class="w-12 rounded-full" src="${post.profile_image}" alt="">
        <div>
          <h4 class="font-bold">${post.author.name}</h4>
          <p>${post.author.designation || 'Unknown'}</p>
        </div>
      </div>
    </div>
    `;
    postsContainer.appendChild(postCard);
  };
  loadingLatestPosts.classList.add('hidden');
}

setTimeout(latestPostsLoad, 2000);

