Ext.define('Erems.view.progressunit.FormDataSurvey', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.progressunitformdatasurvey',
 //    requires:[
	// 	'Erems.library.template.component.Complaintstatuscombobox'
	// ],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 300,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'padding:5px 5px 0',
    defaults: {
        border: false,
        xtype: 'panel',
        flex: 1,
        layout: ''

    },
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                labelAlign: 'top',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [
                {
                    xtype  : 'hiddenfield',
                    itemId : 'fdms_flag_form',
                    name   : 'flag_form',
                    value  : 'data_survey',
                },
                {
                    xtype  : 'hiddenfield',
                    itemId : 'fdms_unit_id',
                    name   : 'unit_id'
                },
                {
                    xtype      : 'numberfield',
                    itemId     : 'fdms_nilai_survey',
                    name       : 'nilai_survey',
                    fieldLabel : 'Nilai Survey',
                    allowBlank : false
                },
                {
                    xtype      : 'numberfield',
                    itemId     : 'fdms_nilai_survey_nps',
                    name       : 'nilai_survey_nps',
                    fieldLabel : 'Nilai NPS',
                    allowBlank : false
                }
                ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});