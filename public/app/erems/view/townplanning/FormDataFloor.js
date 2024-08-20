Ext.define('Erems.view.townplanning.FormDataFloor', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.townplanningformdatafloor',
    requires: ['Erems.template.ComboBoxFields'],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 230,
    width: 380,
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
        var cbf = new Erems.template.ComboBoxFields();

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
                    xtype: 'hiddenfield',
                    itemId: 'fdms_unit_id',
                    name: 'unit_id'
                },
                {
                    xtype: 'hiddenfield',
                    itemId: 'fdms_max_lantai',
                    name: 'max_lantai'
                },
                {
                    xtype            : 'combobox',
                    name             : 'productcategory_productcategory_id',
                    itemId           : 'productcategory_productcategory_id',
                    fieldLabel       : 'Product Category',
                    allowBlank       : false,
                    queryMode        :'local',
                    readOnly         : true,
                    displayField     : cbf.productcategory.d,
                    valueField       : cbf.productcategory.v,
                    maxLength        : 30,
                    anchor           : '-5'
                },
                {
                    xtype            : 'combobox',
                    name             : 'purpose_purpose_id',
                    itemId           : 'purpose_purpose_id',
                    fieldLabel       : 'Purpose',
                    allowBlank       : false,
                    queryMode        :'local',
                    readOnly         : true,
                    displayField     : cbf.purpose.d,
                    valueField       : cbf.purpose.v,
                    maxLength        : 30,
                    anchor           : '-5'
                },
                {
                    xtype            : 'numberfield',
                    name             : 'land_size',
                    itemId           : 'fd_land_size',
                    fieldLabel       : 'Land Size',
                    //allowBlank       : false,
                    readOnly         : true,
                    enforceMaxLength : true,
                    maxLength        : 30,
                    anchor           : '-5'
                },
                {
                    xtype            : 'numberfield',
                    name             : 'building_size',
                    itemId           : 'fd_building_size',
                    fieldLabel       : 'Building Size',
                    //allowBlank       : false,
                    readOnly         : true,
                    enforceMaxLength : true,
                    maxLength        : 30,
                    anchor           : '-5'
                },
                {
                    xtype            : 'numberfield',
                    name             : 'floor',
                    itemId           : 'fd_floor',
                    fieldLabel       : 'Jumlah Lantai',
                    allowBlank       : false,
                    enforceMaxLength : true,
                    maxLength        : 30,
                    anchor           : '-5'
                }
                
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});