const loadingPosts = document.getElementById('loading-posts');

const postsLoad = async (searchText) => {
  // searchText == '' ? searchText = 'iphone' : null;
  const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts`);
  const data = await res.json();
  const posts = data.posts;
  // console.log(posts);
  // loadingPosts.classList.remove('hidden');
  displayPosts(posts);
  loadingPosts.classList.add('hidden');
}

const displayPosts = posts => {
  const postsContainer = document.getElementById('postsContainer');
  postsContainer.innerHTML = '';

  posts.forEach(post => {
    let active = '';
    post.isActive ? active = 'bg-[#10B981]' : active = 'bg-[#FF3434]';

    const postCard = document.createElement('div');
    postCard.classList = `flex flex-col lg:flex-row bg-[#F3F3F5] p-8 rounded-2xl gap-5 border-2 border-[#F3F3F5] hover:border-[#10B981] hover:bg-[#10b98115]`;
    postCard.innerHTML = `
    <!-- Card Left -->
    <div class="flex gap-4 items-center lg:items-start">
      <div class="relative">
        <div class="w-24 rounded-2xl overflow-hidden">
          <img src="${post.image}" alt="">
        </div>
        <div id="post-author-active"
          class="w-4 h-4 lg:w-6 lg:h-6 absolute -top-1 lg:-top-2 lg:-right-2 rounded-full ${active}">
        </div>
      </div>
      <p class="flex flex-col lg:flex-row lg:hidden gap-3 lg:gap-10 font-medium">
        <span>#${post.category}</span>
        <span>Author : ${post.author.name}</span>
      </p>
    </div>
    <!-- Card Right -->
    <div class="flex flex-col gap-3">
      <p class="flex flex-col lg:flex-row hidden lg:block gap-3 lg:gap-10 font-medium">
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
          <img src="images/icons/read.png" alt="">
        </div>
      </div>
    </div>
    `;
    postsContainer.appendChild(postCard);
  });
  // showAllPhones = false;
}

setTimeout(postsLoad, 2000);

// ------------ Latest Posts ------------------
const loadingLatestPosts = document.getElementById('loading-latest-posts');

const latestPostsLoad = async () => {
  const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/latest-posts`);
  const data = await res.json();
  console.log(data);
  displayLatestPosts(data);
  loadingLatestPosts.classList.add('hidden');
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
}

setTimeout(latestPostsLoad, 2000);