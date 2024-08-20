Ext.define('Cashier.view.mastercoaconfig.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.mastercoaconfigformdata',
    requires: ['Cashier.view.mastercoaconfig.ValueGrid'],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    deletedRows: [],
    editedRow: -1,
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                labelAlign: 'left',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [
                
                {
                    xtype: 'hiddenfield',
                    name: 'project_project_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'pt_pt_id'
                },
                {
                    xtype: 'hiddenfield',
                    itemId: 'fdms_id',
                    name: 'coa_config_id'
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_attribute',
                    name: 'name',
                    fieldLabel: ' Name',
                    allowBlank: false,
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 50,
                    anchor: '-5',
                    width: '500'


                },
                {
                    xtype: 'splitter',
                    width: '650'
                },
                {
                    xtype: 'textareafield',
                    height: 60,
                    itemId: 'fdms_description',
                    name: 'description',
                    fieldLabel: 'Description',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 255,
                    anchor: '-5'
                },
                {
                    xtype: 'textareafield',
                    height: 60,
                    itemId: 'fdms_notes',
                    name: 'notes',
                    fieldLabel: 'Notes',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 255,
                    anchor: '-5'
                },
                {
                    xtype: 'fieldset',
                    height: 250,
                    width: '300',
                    itemId: 'MadetailFieldSet',
                    title: 'Coa Detail',
                    items: [
                        {xtype: 'mastercoaconfigvaluegrid', itemId: 'valuemastercoaconfig_grid'}
                    ]
                }],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

