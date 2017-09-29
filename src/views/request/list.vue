<template>
  <div class="app-container calendar-list-container">

    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row style="width: 100%">

      <el-table-column align="center" label="#" width="80">
        <template scope="scope">
          <span>{{scope.row._id}}</span>
        </template>
      </el-table-column>

      <el-table-column width="100px" align="center" label="AT">
        <template scope="scope">
          <span>{{scope.row.created_at | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>

      <el-table-column width="160px" align="center" label="URL">
        <template scope="scope">
          <span>{{scope.row.protocol}}://{{scope.row.host}}:{{scope.row.port}}{{scope.row.path}}</span>
        </template>
      </el-table-column>

      <el-table-column width="60px" align="center" label="M">
        <template scope="scope">
          <span>{{scope.row.method}}</span>
        </template>
      </el-table-column>

      <el-table-column width="110px" align="center" label="QUERY">
        <template scope="scope">
          <span>{{scope.row.query}}</span>
        </template>
      </el-table-column>

      <el-table-column width="110px" align="center" label="HEADER">
        <template scope="scope">
          <span>{{scope.row.header}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="60px" label="S">
        <template scope="scope">
          <span>{{scope.row.status}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="200px" label="REQ">
        <template scope="scope">
          <span>{{scope.row.request_body}}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="200px" align="center" label="RESP">
        <template scope="scope">
          <span>{{scope.row.response_body}}</span>
        </template>
      </el-table-column>

    </el-table>

    <div v-show="!listLoading" class="pagination-container">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
        :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>

  </div>
</template>

<script>
import { list as rnrList } from '@/api/rnr'
import waves from '@/directive/waves.js'// 水波纹指令
import { parseTime } from '@/utils'

export default {
  name: 'request_and_response',
  directives: {
    waves
  },
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      tableKey: 0
    }
  },
  filters: {},
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      rnrList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    }
  }
}
</script>
