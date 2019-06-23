/// <reference path="../../node_modules/@types/jquery/index.d.ts" />
/// <reference path="../../node_modules/@types/bootstrap/index.d.ts" />

let vals = {
  align_content: 'stretch',
  align_items: 'stretch',
  flex_direction: 'row',
  flex_wrap: 'nowrap',
  justify_content: 'flex-start',
};

function UpdateSampleCssCode() {
  const codeElement: JQuery = $('#sample_css_code code');
  let codeString: string = '';
  codeString += '.flex_container {\n';
  codeString += '\tdisplay: flex;\n';
  codeString += '\tflex-direction: ' + vals.flex_direction + ';\n';
  codeString += '\tflex-wrap: ' + vals.flex_wrap + ';\n';
  codeString += '\tjustify-content: ' + vals.justify_content + ';\n';
  codeString += '\talign-items: ' + vals.align_items + ';\n';
  codeString += '\talign-content: ' + vals.align_content + ';\n';
  codeString += '\t\n';
  codeString += '\t/* 必要に応じてflexbox以外のプロパティも指定する。 */\n';
  codeString += '\t\n';
  codeString += '}';
  codeElement.text(codeString);
}

$(() => {
  $('#btn_group_direction input[type=radio]').change((e) => {
    const $flexContainer: JQuery = $('.flex_container');
    const radioValue: string = $(e.target).val() as string;
    $flexContainer.css('flex-direction', radioValue);
    vals.flex_direction = radioValue;
    UpdateSampleCssCode();
  });
  $('#btn_group_wrap input[type=radio]').change((e) => {
    const $flexContainer: JQuery = $('.flex_container');
    const radioValue: string = $(e.target).val() as string;
    $flexContainer.css('flex-wrap', radioValue);
    vals.flex_wrap = radioValue;
    if (radioValue === 'nowrap') {
      $('.wrap_visible').css('display', 'none');
    } else {
      $('.wrap_visible').css('display', 'block');
    }
    UpdateSampleCssCode();
  });
  $('#btn_group_justify_content input[type=radio]').change((e) => {
    const $flexContainer: JQuery = $('.flex_container');
    const radioValue: string = $(e.target).val() as string;
    $flexContainer.css('justify-content', radioValue);
    vals.justify_content = radioValue;
    UpdateSampleCssCode();
  });
  $('#btn_group_align_items input[type=radio]').change((e) => {
    const $flexContainer: JQuery = $('.flex_container');
    const radioValue: string = $(e.target).val() as string;
    $flexContainer.css('align-items', radioValue);
    vals.align_items = radioValue;
    UpdateSampleCssCode();
  });
  $('#btn_group_align_content input[type=radio]').change((e) => {
    const $flexContainer: JQuery = $('.flex_container');
    const radioValue: string = $(e.target).val() as string;
    $flexContainer.css('align-content', radioValue);
    vals.align_content = radioValue;
    UpdateSampleCssCode();
  });

  $('.wrap_visible').css('display', 'none');
  UpdateSampleCssCode();
});
