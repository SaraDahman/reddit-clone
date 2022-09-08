const formsSection = document.querySelector('.forms');
const sectionClose = document.querySelector('.form .fa-xmark');

sectionClose.addEventListener('click', () => {
  formsSection.style.display = 'none';
});

/// to open forms when the buttons in header are clicked
const signInForm = document.querySelector('.form .sign-in');
const signUpForm = document.querySelector('.form .sign-up');
const openSignIn = document.querySelector('header .log-in button:nth-child(1)');
const openSignUp = document.querySelector('header .log-in button:nth-child(2)');

const displaySignIn = () => {
  formsSection.style.display = 'flex';
  signInForm.style.display = 'block';
  signUpForm.style.display = 'none';
};

const displaySignUp = () => {
  formsSection.style.display = 'flex';
  signInForm.style.display = 'none';
  signUpForm.style.display = 'block';
};

/// to switch between two forms
openSignIn.addEventListener('click', displaySignIn);
openSignUp.addEventListener('click', displaySignUp);

const switchSignIn = document.querySelector('.form .sign-in p a');
const switchSignUp = document.querySelector('.form .sign-up p a');

switchSignIn.addEventListener('click', displaySignUp);
switchSignUp.addEventListener('click', displaySignIn);

// to display the user's name and image when logged in

const logButtons = document.querySelector('header .log-in');
const userInfo = document.querySelector('header .user-info');
const postsContainer = document.querySelector('.posts');

const handleHomePage = (data) => {
  postsContainer.textContent = '';
  data.forEach((e, i) => {
    const post = document.createElement('div');
    const userData = document.createElement('div');
    const content = document.createElement('div');
    const interactions = document.createElement('div');
    const likesCon = document.createElement('div');
    const commentsCon = document.createElement('div');

    const userImg = document.createElement('img');
    let postImg = null;
    if (e.post_img) {
      postImg = document.createElement('img');
      postImg.src = e.post_img;
    }
    const userName = document.createElement('h3');
    const date = document.createElement('h4');
    const postTitle = document.createElement('h2');

    const postContent = document.createElement('p');

    const likesIcon = document.createElement('i');
    const commentsIcon =document.createElement('i');

    const likesNum = document.createElement('span');
    const commentsNum = document.createElement('span');

    post.id = e.id;
    post.classList = 'post';
    userData.classList = 'user';
    content.classList = 'content';
    interactions.classList = 'interactions';
    likesIcon.classList = 'fa-solid fa-heart';
    commentsIcon.classList = 'fa-solid fa-comment';

    userImg.src = e.user_img;
    userName.textContent = e.name;
    date.textContent = e.date.split('T')[0];
    postTitle.textContent = 'title will be added to db later';
    postContent.textContent = e.post;
    likesNum.textContent = `${e.likes} Likes`;
    commentsNum.textContent = 'Comments';

    postsContainer.appendChild(post);
    post.append(userData, content, interactions);
    userData.append(userImg, userName, date);
    if (postImg) {
      content.append(postTitle, postContent, postImg);
    } else { content.append(postTitle, postContent); }
    likesCon.append(likesIcon, likesNum);
    commentsCon.append(commentsIcon, commentsNum);
    interactions.append(likesCon, commentsCon);
  });
};

const fetchHomepageData = () => {
  fetch('/users/homepage')
    .then((res) => res.json())
    .then((res) => {
      if (res.user) {
        userInfo.style.display = 'flex';
        logButtons.style.display = 'none';
        userInfo.children[0].src = res.user.user_img;
        userInfo.children[1].textContent = res.user.name;
      }
      handleHomePage(res.data);
    });
};

fetchHomepageData();

userInfo.addEventListener('click', () => {
  window.location.href = '/profile';
});
