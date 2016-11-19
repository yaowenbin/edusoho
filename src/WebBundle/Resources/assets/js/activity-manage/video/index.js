import  FileChooser from '../../../common/file-choose';
jQuery.validator.addMethod("unsigned_integer", function (value, element) {
    return this.optional(element) || /^([1-9]\d*|0)$/.test(value);
}, "时长必须为非负整数");

jQuery.validator.addMethod("second_range", function (value, element) {
    return this.optional(element) || /^([0-9]|[012345][0-9]|59)$/.test(value);
}, "秒数只能在0-59之间");

function _inItStep2form() {
    var $step2_form = $('#step2-form');
    var validator = $step2_form.data('validator');
    $step2_form.validate({
        onkeyup: false,
        ignore: "",
        rules: {
            title: 'required',
            minute: 'required unsigned_integer',
            second: 'second_range',
            'ext[mediaSource]': 'required'
        },
        messages: {
            title: "请输入标题",
            minute: {
                required: '请输入时长',
                unsigned_integer: '时长必须为非负整数',
            },
            second: {
                unsigned_integer: '时长必须为非负整数',
            },
            'ext[mediaSource]': "请选择或者上传视频"
        }
    });
    $step2_form.data('validator', validator);
}

_inItStep2form();

$(".js-length").blur(function () {
    let validator = $("#step2-form").data('validator');
    if (validator && validator.form()) {
        const minute = parseInt($('#minute').val()) | 0;
        const second = parseInt($('#second').val()) | 0;
        $("#length").val(minute * 60 + second);
    }
});

const fileChooser = new FileChooser();

const onSelectFile = file => {
    if (file.length && file.length > 0) {
        let minute = parseInt(file.length / 60);
        let second = Math.round(file.length % 60);
        $("#minute").val(minute);
        $("#second").val(second);
    }
    $("#ext_mediaSource").val(file.source);
    if (file.source == 'self') {
        $("#ext_mediaId").val(file.id);
    } else {
        $("#ext_mediaUri").val(file.uri)
    }
};

fileChooser.on('select', onSelectFile);

