<template>
  <div class="container">
    <div class="row justify-content-end">
      <div class="col-3">
        <div class="userMenu">
          <ul class="userMenu__list">
            <li class="list__item">
              <router-link class="list__item__link nav-link" to="/admin/work-application"
                >工作</router-link
              >
            </li>
            <li class="list__item">
              <router-link class="list__item__link nav-link" to="/admin/document-cv"
                >文件</router-link
              >
            </li>
            <li class="list__item">
              <router-link class="list__item__link nav-link" to="/admin/chatroom"
                >聊天室</router-link
              >
            </li>
            <li class="list__item">
              <router-link class="list__item__link nav-link" to="/admin/setting"
                >帳戶設定</router-link
              >
            </li>
            <li class="list__item userMenu__list__logOut">
              <p>登出</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss"></style>
