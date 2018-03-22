export const closeCourse = () => {
  $('body').on('click', '.js-close-course', function (evt) {
    let $target = $(evt.currentTarget);
    if (!confirm(Translator.trans('course.manage.close_hint'))) {
      return;
    }

    $.post($target.data('check-url'), function (data) {

      if (data.warn) {
        if (!confirm(Translator.trans(data.message))) {
          return;
        }
      }

      $.post($target.data('url'), function (data) {
        if (data.success) {
          cd.message({ type: 'success', message: Translator.trans('course.manage.close_success_hint') });
          location.reload();
        } else {
          cd.message({ type: 'danger', message: Translator.trans('course.manage.close_fail_hint') + ':' + data.message });
        }
      });
    });
  });
};

export const deleteCourse = () => {
  $('body').on('click', '.js-delete-course', function (evt) {
    if (!confirm(Translator.trans('course.manage.delete_hint'))) {
      return;
    }
    $.post($(evt.currentTarget).data('url'), function (data) {
      if (data.success) {
        cd.message({ type: 'success', message: Translator.trans('site.delete_success_hint') });
        if (data.redirect) {
          window.location.href = data.redirect;
        }else {
          location.reload();
        }
      } else {
        cd.message({ type: 'danger', message: Translator.trans('site.delete_fail_hint') + ':' + data.message });
      }
    });
  });
};

export const publishCourse = () => {
  $('body').on('click', '.js-publish-course', function (evt) {
    if (!confirm(Translator.trans('course.manage.publish_hint'))) {
      return;
    }
    $.post($(evt.target).data('url'), function (data) {
      if (data.success) {
        cd.message({ type: 'success', message: Translator.trans('course.manage.task_publish_success_hint') });
        location.reload();
      } else {
        cd.message({ type: 'danger', message: Translator.trans('course.manage.task_publish_fail_hint')+':' + data.message, delay: 5000 });
      }
    });
  });
};

export const showSettings = () => {
  $("#sortable-list").on('click', '.js-item-content', (event) => {
    console.log('click');
    let $this = $(event.currentTarget);
    let $li = $this.closest('.js-task-manage-item');
    if ($li.hasClass('active')) {
      $li.removeClass('active').find('.js-settings-list').stop().slideUp(500);
    }
    else {
      $li.addClass('active').find('.js-settings-list').stop().slideDown(500);
      $li.siblings(".js-task-manage-item.active").removeClass('active').find('.js-settings-list').hide();
    }
  });
};

export const TabChange = () => {
  $('[data-role="tab"]').click(function (event) {
    let $this = $(this);
    $($this.data('tab-content')).removeClass("hidden").siblings('[data-role="tab-content"]').addClass('hidden');
  });
};


export const TaskListHeaderFixed = () => {
  let $header = $('.js-task-list-header');
  if(!$header.length){
    return;
  }
  let headerTop = $header.offset().top;
  $(window).scroll(function(event) {
      if ($(window).scrollTop() >= headerTop) {
        $header.addClass('fixed')
      } else {
        $header.removeClass('fixed');
      }
  });
}
