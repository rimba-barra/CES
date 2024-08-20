Ext.define('Erems.view.mastercluster.FormAddImage', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.masterclusterformaddimage',
    //  requires: ['Erems.library.component.FormUploadImage','Erems.library.Config'],
    frame: true,
    autoScroll: true,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    controllerName: 'mastercluster',
    myConfig: null,
    editedRow: -1,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                labelAlign: 'top',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;'
            },
            items: [{
                    xtype: 'hiddenfield',
                    itemId: 'clusterimages_id',
                    name: 'clusterimages_id'
                }, {
                    xtype: 'hiddenfield',
                    itemId: 'cluster_id',
                    name: 'cluster_cluster_id'
                },
                {
                    xtype: 'hiddenfield',
                    itemId: 'image',
                    name: 'image'
                },
                {
                    xtype: 'textfield',
                    itemId: 'fai_cluster',
                    name: 'cluster_cluster',
                    fieldLabel: 'Cluster Name',
                    readOnly: true,
                    enforceMaxLength: true,
                    maxLength: 50,
                    anchor: '-5'

                }, {
                    xtype: 'form',
                    itemId: 'formkud',
                    bodyStyle: 'background:none;border:0',
                    layout: 'hbox',
                    items: [{
                            xtype: 'filefield',
                            itemId: 'mastercluster_detail_image',
                            name: 'cluster_detail_image',
                            fieldLabel: 'Image',
                            emptyText: 'Select an image',
                            buttonText: 'Browse',
                            labelAlign: 'top',
                            labelSeparator: ' ',
                            labelClsExtra: 'small',
                            fieldStyle: 'margin-bottom:3px;'
                        }]
                },
                {
                    xtype: 'textfield',
                    itemId: 'fai_title',
                    name: 'title',
                    fieldLabel: 'Title',
                    allowBlank:false,
                    enforceMaxLength: true,
                    maxLength: 100,
                    maskRe:/[A-Za-z0-9\s.]/,
                    anchor: '-5'
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
                    uncheckedValue: '0',
                    checked:"1"
                }],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});