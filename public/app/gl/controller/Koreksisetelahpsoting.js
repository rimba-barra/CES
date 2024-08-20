Ext.define('Gl.controller.Koreksisetelahposting', {
    extend: 'Gl.controller.Journal',
    requires: [
       'Gl.library.tools.Mytools',
                'Gl.template.ComboBoxFields',
                'Gl.library.template.combobox.Prefixcombobox',
                'Gl.library.template.combobox.CoaSettingCombobox',
                'Gl.library.template.combobox.SubaccountcodeCombobox',
    ],
    alias: 'controller.Koreksisetelahposting',
    views: [
        'koreksisetelahposting.Panel',
        'koreksisetelahposting.Grid',
    ],
    stores: [
        'Koreksisetelahposting',
        'Project',
        'Pt'
    ],
    models: [
        'Koreksisetelahposting',
        'Project',
        'Pt'
    ],
    elem: null,
    refs: [
        {ref: 'grid', selector: 'koreksisetelahpostinggrid'},
        {ref: 'formsearch', selector: 'koreksisetelahpostingformsearch'},
        {ref: 'formdata', selector: 'koreksisetelahpostingformdata'},
        {ref: 'formimport', selector: 'koreksisetelahpostingformimport'}
    ],
    controllerName: 'koreksisetelahposting',
    fieldName: 'code', //for notif even delete
    bindPrefixName: 'Koreksisetelahposting',
    init: function (application) {
        var me = this;
        this.control({
        })

    }

});