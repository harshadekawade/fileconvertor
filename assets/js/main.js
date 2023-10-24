$('input[type="file"]').change(function () {
    var file = this.files[0];
    var fileType = file["type"];
    var validImageTypes = ["image/png"];
    if ($.inArray(fileType, validImageTypes) < 0) {
        $('.error').html($('bootstrapalert').html());
    } else {
        $('.error').html('');
        $('convertto').show();
    }
});

$('select[name="imagetype"]').change(function () {
    $('button').show();
    $('button').text('CONVERT TO ' + this.value.toUpperCase());
});