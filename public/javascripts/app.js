`use strict`

$(document).ready(() => {
  $(`select`).material_select()
  updatePostListener()
  deletePostListener()
})

var id = parseInt(window.location.pathname.split('/')[2])

function getComments(){
  $.get(`/posts/` + id + `/comments`)
  .then(comments => {
    $(`.container-custom`).append(comments.body)
  })
}

function updatePostListener(){
  $(`.btn-edit-post`).click(() => {
    $.ajax({
      url: `/posts/${id}`,
      method: `PUT`,
      datatype: 'json',
      data: {title: $('#title').val(), image_url: $('#img_url').val(), body: $('#body').val()},
      success: () => {
        console.log(`post updated`);
      },
    })
  })
}

function deletePostListener() {
  $(`.btn-delete-post`).click(() => {
    $.ajax({
      url: `/posts/${id}`,
      method: `DELETE`,
      success: () => {
        console.log(`post deleted`)
      },
    })
  })
}

function updateUserListener() {
  $(`.btn-edit-post`).click(() => {
    $.ajax({
      url: `/users/${id}`,
      method: `PUT`,
      datatype: 'json',
      data: {title: $('#usertitle').val(), image_url: $('#userpic').val(), body: $('#userbody').val()},
      success: () => {
        console.log('user updated');
      }
    })
  })
}
