<template>
  <el-container class="home-container">
   <el-header>
    <div>
      <img src="../assets/tomato.png" />
      <span>Tomato 后台管理系统</span>
    </div>
    <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">
          <i :class="isCollapse ? 'el-icon-caret-right' : 'el-icon-caret-left'"></i>
        </div>
        <el-menu background-color="#333744" text-color="#fff" active-text-color="#409eff"
        :unique-opened="true" :collapse="isCollapse" :collapse-transition="false" :router="true"
        :default-active="activePath">
          <!-- 一级菜单 -->
          <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
            <template slot="title">
              <i :class="iconList[item.id]"></i>
              <span>{{item.name}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item :index="subItem.path" v-for="subItem in item.children"
            :key="subItem.id" @click="saveNavState(subItem.path)">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>{{subItem.name}}</span>
            </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      menuList: [],
      iconList: {
        1: 'el-icon-s-custom',
        2: 'el-icon-s-check'
      },
      isCollapse: false,
      activePath: ''
    }
  },
  created () {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout () {
      window.sessionStorage.removeItem('access_token')
      window.sessionStorage.removeItem('activePath')
      this.$router.push('/login')
    },
    async getMenuList () {
      const res = await this.$http.get('/webapi/userserver/menu')
      if (res.status !== 200) {
        return this.$message.error(res.data.msg)
      }
      this.menuList = res.data.data
    },
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    saveNavState (activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>

<style lang="less" scoped>
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #ffffff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 20px;
      align-items: center;
    }
    img {
      height: 50px;
      margin-left: 20px;
    }
  }
}

.el-aside {
  background-color: #333744;
}

.el-main {
  background-color: #eaedf1;
}

.home-container {
  height: 100%;
}

.toggle-button {
  background-color: #4a5064;
  font-size: 25px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  cursor: pointer;
}
</style>
