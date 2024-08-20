Ext.define('Erems.view.mastertype.FormSearch',{
    extend:'Erems.library.template.view.FormSearch',
    requires:[],
    alias:'widget.mastertypeformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items:[
                {
                    xtype: 'textfield',
                   
                    name: 'type_name',
                    fieldLabel: 'Type name',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 50
                },
                {
                    xtype: 'textfield',
                    name: 'code',
                    fieldLabel: 'Code',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 50
                },
                {
                    xtype: 'combobox',
                   
                    name: 'productcategory_id',
                    fieldLabel: 'Product type',
                    valueField:'productcategory_id',
                    displayField:'productcategory',
                    anchor:'-20'
                 
                },{
                    xtype: 'combobox',
           
                    name: 'cluster_id',
                    fieldLabel: 'Cluster',
                    valueField:'cluster_id',
                    displayField:'cluster',
                    anchor:'-20'
                 
                }
                
            ],/* [
                {
                    xtype: 'productcategorycombobox',
                    itemId: 'fs_mastertype_productcategory',
                    name: 'productcategory_id',
                    fieldLabel: 'Product type',
                    anchor:'-20'
                 
                },{
                    xtype: 'clustercombobox',
                    itemId: 'fs_mastertype_cluster',
                    name: 'cluster_id',
                    fieldLabel: 'Cluster',
                    anchor:'-20'
                 
                },{
                    xtype: 'textfield',
                    itemId: 'fsms_name',
                    name: 'name',
                    fieldLabel: 'Type name',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 50
                },me.createFieldRange({fieldLabel:'Electricity',textName:'electricity',tailText:'watt'}),
                me.createFieldRange({fieldLabel:'Land size',textName:'land_size',tailText:'m2'}),
                me.createFieldRange({fieldLabel:'Floor',textName:'floor',tailText:''}),
                me.createFieldRange({fieldLabel:'Building size',textName:'building_size',tailText:'m2'}),
                me.createFieldRange({fieldLabel:'Bedroom',textName:'bedroom',tailText:''}),
                me.createFieldRange({fieldLabel:'Floor size',textName:'floor_size',tailText:'m2'}),
                me.createFieldRange({fieldLabel:'Bathroom',textName:'bathroom',tailText:''}),
                {
                    xtype: 'buildingclasscombobox',
                    itemId: 'fd_mastertype_buildingclass',
                    name: 'building_class',
                  
                    fieldLabel: 'Building Class'

                }, {
                    xtype: 'salesgroupcombobox',
                    itemId: 'fd_mastertype_salesgroup',
                    name: 'salesgroup',
                  
                    fieldLabel: 'Sales group'

                }
                
            ]*/
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    },
    createFieldRange:function(data){
        
        var x = {
                    xtype: 'panel',
                    height: 48,
                    bodyStyle:'background:none;border:0;',
                    layout: {
                        type: 'column'
                    },
                    items: [
                        {
                            xtype: 'numberfield',
                            width: 100,
                            id:'fs_mastertype_bot'+data.textName,
                            name:'bot_'+data.textName,
                            fieldLabel: data.fieldLabel,
                            labelSeparator:'',
                            labelAlign: 'top',
                            labelWidth: 50,
                             maxLength: 9,
                            minValue: 0,
                            typeNumber:'min',
                            textName:data.textName,
                            value: 0
                        },
                        {
                            xtype: 'label',
                            margin: '20px 5px',
                            padding: '0px 5px',
                            styleHtmlContent: false,
                            width: 15,
                            text: '     -'
                        },
                        {
                            xtype: 'numberfield',
                            width: 100,
                            id:'fs_mastertype_top'+data.textName,
                            name:'top_'+data.textName,
                            fieldLabel: data.fieldLabel,
                            fieldLabel: '&nbsp;',
                            labelSeparator:'',
                            labelAlign: 'top',
                            typeNumber:'max',
                            textName:data.textName,
                             maxLength: 9,
                            minValue: 0,
                            value: 0
                        },
                        {
                            xtype: 'label',
                            margin: '20px 0px',
                            padding: '0px 5px',
                            text: data.tailText
                        }
                    ]
                };
          return x;
    }
});
