Ext.define('Erems.view.masterattribute.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.masterattributeformdata',
    requires: ['Erems.library.template.component.Atttypecombobox','Erems.library.template.component.Datatypecombobox','Erems.view.masterattribute.ValueGrid'],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                labelAlign: 'left',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [{
                    xtype: 'hiddenfield',
                    itemId: 'fdms_id',
                    name: 'attribute_id'
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_code',
                    name: 'code',
                    fieldLabel: 'Code',
                    allowBlank: false,
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 50,
                    anchor: '-5'
                },

                //added by anas 28042021
                {
                    xtype: 'numberfield',
                    itemId: 'fdms_urut',
                    name: 'urut',
                    fieldLabel: 'Urut',
                    allowBlank: false,
                    anchor: '-5'
                },
                //end added anas

                {
                    xtype: 'atttypecombobox',
                    itemId: 'fd_masterattribute_atttype',
                    name: 'atttype_id',
                  
                    fieldLabel: 'Attribute type',
                    anchor:'-170'
                 
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_attribute',
                    name: 'attribute',
                    fieldLabel: 'Attribute Name',
                    allowBlank: false,
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 100,
                    anchor: '-5'
                },
                {
                    xtype      : 'xnotefieldEST',
                    height     : 60,
                    itemId     : 'fdms_description',
                    name       : 'description',
                    fieldLabel : 'Description',
                    anchor     : '-5'
                },
                {
                    xtype: 'checkboxfield',
                    itemId: 'is_freetext',
                    margin: '15 0 0 0',
                    name: 'is_freetext',
                    boxLabel: 'Free Text',
                    inputValue: '1',
             
                    uncheckedValue: '0'
                },
                {
                    xtype: 'checkboxfield',
                    itemId: 'is_default',
                    margin: '15 0 0 0',
                    name: 'is_default',
                    boxLabel: 'Default attribute',
                    inputValue: '1',
              
                    uncheckedValue: '0'
                },{
                    xtype: 'datatypecombobox',
                    itemId: 'fd_masterattribute_datatype',
                    name: 'datatype',
                    hidden:true,
                    fieldLabel: 'Data type',
                    anchor:'-240'
                 
                },{
                    xtype: 'fieldset',
                    height: 250,
                    itemId:'MadetailFieldSet',
                    title: 'Marketing Attribute value',
                    items: [
                        {xtype: 'masterattributevaluegrid',itemId:'valuemasterattribute_grid'}
                    ]
                }],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

