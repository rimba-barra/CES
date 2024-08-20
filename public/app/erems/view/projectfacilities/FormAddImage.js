Ext.define('Erems.view.projectfacilities.FormAddImage', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.projectfacilitiesformaddimage',
    requires: ['Erems.library.component.FormUploadImage', 'Erems.library.Config'],
    frame: true,
    autoScroll: true,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    myConfig: null,
    controllerName: 'projectfacilities',
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
                    itemId: 'fai_id',
                    name: 'projectfacilities_images_id'
                }, {
                    xtype: 'hiddenfield',
                    itemId: 'fai_projectfacilities_id',
                    name: 'projectfacilities_id'
                },
                {
                    xtype: 'hiddenfield',
                    itemId: 'fai_image_name',
                    name: 'image'
                },
                {
                    xtype: 'textfield',
                    itemId: 'fai_projectfacilities',
                    name: 'facilitiestype_facilitiestype',
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
                    fieldLabel: 'Title',
                    allowBlank: 'false',
                    enforceMaxLength: true,
                    maxLength: 50,
                    allowBlank:false,
                    anchor: '-5'

                },{
                    xtype      : 'xnotefieldEST',
                    height     : 60,
                    itemId     : 'fai_description',
                    name       : 'description',
                    fieldLabel : 'Description',
                    anchor     : '-5'
                },
                {
                    xtype: 'filefield',
                    fieldLabel: 'Image',
                    itemId: 'fd_photo',
                    allowBlank:false,
                    name: 'photo_browse',
                }, 
                {
                    xtype: 'panel',
                    bodyStyle: 'background:none',
                    itemId: 'photo_image',
                    height: 200,
                    html: '',
                    anchor: '-5'
                }, 
                {
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
    },
    getControllerName: function() {
        return this.controllerName;
    }
});