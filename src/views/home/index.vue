<script setup lang="ts">
import { useRouter } from 'vue-router'
import useUserStore from '@/store/modules/user'
import ZButton from '@/components/Button/index'

const router = useRouter()
const userStore = useUserStore()

function goRouter(path: string): void {
  router.push(path)
}

function getUserInfo(): void {
  console.log(userStore.userInfo, 'userStore.userInfo')
}
</script>

<template>
  <div class="flex-c flex-align h-100">
    <el-button type="primary" @click="goRouter('/news')">
      go news
    </el-button>
    <el-button type="primary" @click="goRouter('/user')">
      go user
    </el-button>
    <el-button @click="getUserInfo">
      get user info
    </el-button>
    <el-button type="primary" @click="goRouter('/table')">
      go table
    </el-button>
    <z-button type="blue" text="测试blue" :left="10"></z-button>
    <z-button type="warn" text="测试warn" :left="10"></z-button>
  </div>
</template>
