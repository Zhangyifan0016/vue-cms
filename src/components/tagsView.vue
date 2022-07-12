<template>
  <div class="tagsView">
    <ul class="tags-view-list">
      <li
        class="tags-view-item"
        @click="handleSelectTag(item.path)"
        :class="{ active: $route.path === item.path }"
        v-for="(item, index) in tagsView"
        :key="index"
      >
        {{ item.title }}
        <span @click.stop="handleCloseTag(index)"> </span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'TagsView',
  data() {
    return {
      tagsView: [
        { path: '123', title: '1231' },
        { path: '123', title: '1234' }
      ]
    }
  },
  methods: {
    handleSelectTag(path) {
      this.$router.push(path)
    },
    handleCloseTag() {}
  }
}
</script>
<style scoped lang="scss">
.tagsView {
  width: 100%;
  overflow-x: auto;
  .tags-view-list {
    margin-bottom: 5px;
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      background: #fff;
      border: 1px solid #e6a23c;
      color: #e6a23c;
      padding: 0 10px;
      font-size: 12px;
      margin-left: 10px;
      border-radius: 5px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        color: #fff;
        background-color: #e6a23c;
      }
      .close {
        display: inline-block;
        vertical-align: middle;
        width: 16px !important;
        height: 16px;
      }
    }
  }
}
</style>
