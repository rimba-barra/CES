Ext.define('Erems.view.clusterfacilities.FormAddImage', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.clusterfacilitiesformaddimage',
    requires: ['Erems.library.component.FormUploadImage', 'Erems.library.Config'],
    frame: true,
    autoScroll: true,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    myConfig: null,
    editedRow: -1,
    controllerName: 'clusterfacilities',
    initComponent: function() {
        var me = this;
        me.myConfig = new Erems.library.Config();
        Ext.applyIf(me, {
            defaults: {
                labelAlign: 'top',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;'
            },
            items: [{
                    xtype: 'hiddenfield',
                    itemId: 'clusterfacilities_images_id',
                    name: 'clusterfacilities_images_id'
                }, {
                    xtype: 'hiddenfield',
                    itemId: 'clusterfacilities_id',
                    name: 'clusterfacilities_id'
                },
                {
                    xtype: 'hiddenfield',
                    itemId: 'image',
                    name: 'image'
                },
                {
                    xtype: 'textfield',
                    itemId: 'fai_cluster',
                    name: 'clusterfacilities',
                    fieldLabel: 'Facilities Name',
                    readOnly: true,
                    enforceMaxLength: true,
                    maxLength: 50,
                    anchor: '-5'
                },
                {
                    xtype: 'textfield',
                    itemId: 'fai_title',
                    name: 'title',
                    itemId: 'title',
                    fieldLabel: 'Title',
                    allowBlank:false,
                    enforceMaxLength: true,
                    maxLength: 50,
                    anchor: '-5'
                },
                //Image
                {
                    xtype: 'form',
                    itemId: 'formku',
                    bodyStyle: 'background:none;border:0',
                    items: [{
                            xtype: 'filefield',
                            itemId: 'clusterfacilities_layermapd',
                            name: 'clusterfacilities_layermapd',
                            fieldLabel: 'Layer map images',
                            emptyText: 'Select an image',
                            buttonText: 'Browse'
                        }]
                },
                {
                    xtype      : 'xnotefieldEST',
                    height     : 60,
                    itemId     : 'fai_description',
                    name       : 'description',
                    fieldLabel : 'Description',
                    anchor     : '-5'
                }, {
                    xtype: 'panel',
                    bodyStyle: 'background:none',
                    itemId: 'addImage_layermapimage',
                    height: 200,
                    html: '',
                    anchor: '-5'
                }, {
                    xtype: 'checkboxfield',
                    itemId: 'fai_is_default',
                    margin: '15 0 0 0',
                    name: 'is_default',
                    boxLabel: 'As Default',
                    inputValue: '1',
                    uncheckedValue: '0'
                }],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});