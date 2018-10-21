<template lang="pug">
  .page-content.media-library
    .media-header
      .media-header-actions.left
        span.ml-2.d-inline-block(v-if="selectedFiles.length") {{ selectedFiles.length }} Files selected
        a.ml-2.d-inline-block(v-if="selectedFiles.length", @click="deselectAll") Deselect All
      .media-header-actions.right
        v-btn(icon, @click="currentLayout = 'row'", :class="{'active': currentLayout === 'row'}")
          v-icon fas fa-th-list
        v-btn(icon, @click="currentLayout = 'grid'", :class="{'active': currentLayout === 'grid'}")
          v-icon fas fa-th-large
    .dropzone(ref="dropzoneElement", :class="{'layout-row': currentLayout !== 'grid', 'has-files': files.length}")
      .files-container(v-if="files.length")
        .file-item-header
          span.file-name Name
          span.file-date Last Modified
          span.file-size Size
        .file-item(v-for="(file, index) in files", :class="{'active': isActive(file)}", @click="selectFile(file)")
          .select-icon
            v-icon fas fa-check
          img(:src="getFileThumbnail(file)", v-if="file.asset_type === 'image'")
          .preview-icon(v-else)
            v-icon fas fa-video
          .file-details
            span.file-name(:alt="file.name") {{ file.name }}
            span.file-date(:alt="file.mDate") {{ file.mDate }}
            span.file-size {{ getFileSize(file.size) }}
      transition(name='slide-right')
        .file-details-view(v-if="selectedFiles.length")
          .file(v-if="selectedFiles.length === 1")
            .file-name(:alt="selectedFiles[0].name") Name: <br> <b>{{ selectedFiles[0].name }}</b>
            .file-url.mt-3 Public URL: <br>
              .url-wrapper
                span.url {{ getAssetUrl(selectedFiles[0]) }}
                a.copy-icon(alt="Copy to clipboard", @click="copyFileUrlToClipboard(selectedFiles[0])")
                  v-icon file_copy
            .file-date.mt-3 Last Modified: <br> <b>{{ selectedFiles[0].mDate }}</b>
            .file-size.mt-3 Size: <br><b>{{ getFileSize(selectedFiles[0].size) }}</b>
            v-btn.mt-4.mx-0(
              color="error",
              small,
              @click="deleteSelectedFile(selectedFiles[0])",
              :loading="isDeletingFile",
              :disabled="isDeletingFile"
            ) Delete File
              v-icon(right) delete
          .files(v-else)
            .file-name Selected <b>{{selectedFiles.length}}</b> files
            v-btn.mt-4.mx-0(color="error", small).mt-4.mx-0 Delete Files
              v-icon(right) delete
      .dropzone-loader(v-if="isLoading")
        v-progress-circular(
          color="primary"
          size="50"
          indeterminate
        )
</template>

<script>
import Dropzone from 'dropzone'
import copyTextToClipboard from '@/utils/copy-to-clipboard'
import Ls from '@/services/ls.js'
import { mapActions, mapGetters } from 'vuex'

const API_URL = process.env.API_URL

export default {
  data () {
    return {
      selectedFiles: [],
      currentLayout: 'grid',
      isLoading: false,
      isDeletingFile: false,
      isDeletingFiles: false,
      dropzoneOptions: {
        paramName: 'image',
        url: `${API_URL}/organization/${this.$route.params.orgId}/asset/`,
        autoProcessQueue: true,
        clickable: true,
        previewsContainer: false,
        thumbnailWidth: 200,
        thumbnailHeight: 200,
        dictDefaultMessage: '<i class="fas fa-cloud-upload-alt"></i> ' + this.$t('general.fileUploadMediaLibrary'),
        headers: this.headers
      }
    }
  },
  mounted () {
    this.dropzoneOptions.headers = this.headers
    this.isLoading = true

    this.fetchFiles().then((res) => {
      this.isLoading = false
      console.log(res)
    })
    this.dropzone = new Dropzone(this.$refs.dropzoneElement, {
      ...this.dropzoneOptions,
      thumbnail: (file) => {
        file.mDate = new Date(file.lastModified).toLocaleDateString('en-US')
      },
      sending: (data, xhr, formData) => {
        formData.append('asset_type', 'image')
        formData.append('name', data.name)
        this.isLoading = true
      },
      success: (file, res) => {
        this.addFile(res.data)
      },
      complete: () => {
        this.isLoading = false
      }
    })
  },
  computed: {
    ...mapGetters('organization', ['selectedOrganization']),
    ...mapGetters('media', ['files']),
    headers () {
      const AUTH_TOKEN = Ls.get('auth.token')
      const headers = {
        'Cache-Control': null
      }
      if (AUTH_TOKEN) {
        headers['Authorization'] = `Bearer ${AUTH_TOKEN}`
      }
      return headers
    }
  },
  methods: {
    ...mapActions('media', ['fetchFiles', 'addFile', 'deleteFile']),
    removeFile (file, index) {
      this.files.splice(index, 1)
      this.dropzone.removeFile(file)
    },
    isActive (file) {
      let found = this.selectedFiles.find((f) => f.id === file.id)

      return (found)
    },
    selectFile (file) {
      let found = this.selectedFiles.findIndex((f) => f.id === file.id)
      if (found > -1) {
        this.selectedFiles.splice(found, 1)
      } else {
        this.selectedFiles.push(file)
      }
    },
    deselectAll () {
      this.selectedFiles = []
    },
    deleteSelectedFile (file) {
      this.isDeletingFile = true

      this.deleteFile(file).then((res) => {
        this.isDeletingFile = false
        this.selectedFiles = []
        global.toastr['success'](this.$t('media.fileDeletedMessage'), this.$t('general.success'))
      })
    },
    copyFileUrlToClipboard (file) {
      let fileUrl = this.getAssetUrl(file)
      copyTextToClipboard(fileUrl).then(() => {
        global.toastr['success'](this.$t('general.urlCopied'))
      })
    },
    getAssetUrl (file) {
      return file[file.asset_type] || null
    },
    getFileThumbnail (file) {
      return file[file.asset_type] || null
    },
    getFileSize (bytes) {
      var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
      if (bytes === 0) return '0 Byte'
      var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
      return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i]
    }
  }
}
</script>

<style lang="scss">
@import "styles/colors.scss";
@import '../../../node_modules/dropzone/dist/dropzone.css';

.slide-right-enter-active, .slide-right-leave-active {
  transition: all .5s;
}

.slide-right-enter, .slide-right-leave-to /* .slide-right-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(200px);
}

.dropzone-loader {
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
  background: rgba(255, 255 ,255, 0.8)
}

.media-library {

  .dz-message {
    font-size: 16px;
    color: #9ba9c4;

    svg {
      margin-right: 10px;
    }
  }

  .has-files .dz-message {
    display: none;
  }

  .media-header {
    color: #9ba9c4;
    display: flex;
    background-color: #f8fafc;
    margin-bottom: 20px;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;

    .media-header-actions {
      display: flex;

      .btn {
        .icon {
          color: #9ba9c4;
        }
      }

      .active.btn .icon{
        color: $primary;
      }
    }
  }

  .dropzone {
    min-height: 100px;
    width: 100%;
    background: white;
    border: 0;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    position: relative;

    &.dz-drag-hover {
      background-color:  #f8fafc;
    }
  }

  .file-details-view {
    flex: 1;
    background: #f8fafc;
    padding: 20px;
    overflow: hidden;

    .file-name{
      display: block;
      color: #00082a;
    }

    .url-wrapper {
      display: flex;
    }

    .copy-icon {
      margin-left: 5px;
      padding: 5px;
      font-size: 14px;
      background: #9ba9c4;
      border-radius: 5px;
      display: flex;
      cursor: pointer;
      background: #4b83f0;

      .icon {
        font-size: 16px;
        color: white;
      }
    }

    .url {
      overflow: scroll;
      display: block;
      padding: 5px;
      background: #9ba9c485;
      color: #00082a;
      position: relative;
      white-space: nowrap;
    }
  }

  .files-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    flex: 4;

    .file-item-header {
      display: none;
    }

    .file-item {
      flex: 1;
      max-width: 220px;
      margin: 10px;
      border: 1px solid #d9d9d9;
      padding: 10px;
      position: relative;

      .select-icon {
        position: absolute;
        top: 0;
        right: 0;
        padding: 5px;
        background-color: $primary;
        display: flex;
        opacity: 0;
        visibility: hidden;
        transition: all 0.2s ease-in-out;

        .icon {
          font-size: 18px;
          color: white;
        }
      }

      &.active {
        border-color: $primary !important;

        .select-icon {
          opacity: 1;
          visibility: visible;
        }
      }

      .file-details {
        margin-top: 10px;
        display: flex;
        font-size: 13px;
      }

      .file-name {
        display: block;
        text-overflow: ellipsis;
        overflow: hidden;
        width: 100%;
        white-space: nowrap;
        font-weight: bold;
        color: #00082a;
        flex: 2;
      }

      .file-date {
        display: none;
        flex: 1;
        color: #9ba9c4;
      }

      .file-size {
        flex: 1;
        color: #9ba9c4;
        text-align: right;
      }

      .preview-icon {
        height: 200px;
        width: 200px;
        background: #f8fafc;
        display: flex;
        align-items: center;
        justify-content: center;

        .icon {
          color:#9ba9c4;
        }
      }

      img {
        display: block;
        object-fit: cover;
        width: 200px;
        height: 200px;
        background: #f8fafc;
      }
    }
  }

  .layout-row {

    .files-container {

      flex-direction: column;
      align-items: stretch;
      margin-right: 20px;

      .file-item-header {
        display: flex;
        padding: 10px;
        padding-left: 100px;
        border-bottom: 1px solid #d9d9d9;
        color: #9ba9c4;

        span {
          height: 20px;
        }

        .file-name {
          flex: 2;
        }

        .file-size {
          flex: 1;
          text-align: center;
        }

        .file-date {
          flex: 1;
          text-align: center;
        }
      }

      .file-item {
        border: none;
        display: flex;
        border-bottom: 1px solid #d9d9d9;
        max-width: none;
        flex: none;
        margin: 0;

        .preview-icon {
          width: 60px;
          height: 60px;
        }

        img {
          width: 60px;
          height: 60px;
        }

        .file-details {
          margin: 0;
          margin-left: 30px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex: 1;

          .file-date {
            display: block;
            text-align: center;
            color: #00082a;
          }

          .file-size {
            text-align: center;
            color: #00082a;
          }

        }
      }
    }
  }
}
</style>
