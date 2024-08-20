Ext.define('Erems.library.box.Config', {
    moduleName:'erems',
    _module:'erems',
    _viewFolder:'Erems.view.',
    _controllerName:null,
    MAX_YEAR:2050,
    MIN_YEAR:1800,
    DATE_FORMAT:'d-m-Y',
    DATE_SUBMITFORMAT:'Y-m-d',
    MAX_HOUR_LEN:2,
    MAX_MINUTE_LEN:2,
    IMG_FOLDER:'app/erems/uploads/customer/',
    IMG_FOLDER_CD:'app/erems/uploads/customerdocuments/',
    IMG_FOLDER_FT:'app/erems/uploads/facilitiestype/',
    IMG_FOLDER_PF:'app/erems/uploads/projectfacilities/',
    IMG_FOLDER_CL:'app/erems/uploads/mastercluster/',
    IMG_FOLDER_CF:'app/erems/uploads/clusterfacilities/',
    IMG_FOLDER_TW:'app/erems/uploads/topupwhatsapp/',
    CRYPTO_FILEPATH:'app/erems/uploads/CryptoJSv3.1/rollups/md5.js',
    constructor: function(options) {
        Ext.apply(this, options || {});
        var me = this;
        me._viewFolder = me._viewFolder+''+me._controllerName+'.';
    },
    getViewFolder:function(){
        return this._viewFolder;
    }
    
    
});


