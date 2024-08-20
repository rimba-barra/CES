<?php

/**
 * Description of ReadWorms
 * @ReadWorms 
 * @Read Without Request Models
 * @author MIS
 */
class Master_Box_Models_App_Models_ReadWorms extends Master_Box_Models_App_AbModel {

    private $request;
    protected $dataList = array();
    protected $hasil;
    protected $currentDataList;
    protected $requestModel;

    public function __construct($controller, $debug = '') {
        $this->requestModel = FALSE;
        $this->hasil = new Master_Box_Models_App_HasilReadExtraModel();
        parent::__construct($controller, $debug);
        $this->request = new Master_Box_Models_App_HasilRequestRead($this->getData());
    }

    protected function getHasil() {
        return $this->hasil;
    }

    public function getModeRead() {
        $r = $this->request;
        return $r->getModeRead();
    }

    protected function getPost(Zend_Controller_Action $controller) {
        return $controller->getRequest()->getPost();
    }

    public function getCurrentDataList() {
        return $this->currentDataList;
    }

    public function setCurrentDataList($currentDataList) {
        $this->currentDataList = (string) $currentDataList;
    }

    /* @return void 
     * 
     */

    public function setAksesorisValue($name, $value) {
        $x = $this->currentDataList;
        if (array_key_exists($x, $this->dataList)) {
            $y = $this->hasil->getData();
            $y[0][$name] = $value;
            $this->hasil->setData($y);
        }
        
    }
    
    /*added 18 february 2014*/
    public function setData($data){
        $this->hasil->setData($data);
    }

    public function prosesDao($name, $dataDao) {
        $dl = NULL;

        if (key_exists($name, $this->dataList)) {
            $row = 0;
            $x = array();
            if (count($dataDao) > 0) {
                $dl = $this->dataList[$name];
                $this->currentDataList = $name;
                $dl->setDataDao($dataDao);
                $x = array();
                foreach ($dl->getList() as $row) {
                    /* added 23 Mei */
                    if($row instanceof Master_Box_Models_App_InterInsertable){
                        $row->insert($this->getStoredObject());
                    }
                    /* end added */
                    $x[] = $row->getArrayEmbed();
                }
                $row = $dl->getTotalRow();
            }

            $this->hasil->setTotalRow($row);
            $this->hasil->setData($x);
            if($this->requestModel){
                $this->hasil->setModel($this->generateExtJSMOdel());
            }
            
        }
    }
    
    public function getRequestModel() {
        return $this->requestModel;
    }

    public function setRequestModel($requestModel) {
        $this->requestModel = (boolean)$requestModel;
    }

    
    public function getRequest() {
        return $this->request;
    }

    public function getDataList() {
        return $this->dataList;
    }

    public function setDataList($dataList) {
        $this->dataList = $dataList;
    }

    public function registerDataList($nama, Master_Box_Kouti_AbDataList $dataList) {
        $this->dataList[$nama] = $dataList;
    }

    protected function prosesHasilBeforeRun() {
        
    }

    protected function generateExtJSMOdel() {
        $hasil = $this->getInnerHasil();
        $data = $this->getData();
        $r = $this->getRequest();

        $hasil = $this->getHasil();

        $dl = $this->getDataList();
        $auModels = array();
        foreach ($dl as $k => $v) {

            $groupEmbede = new Master_Box_Models_App_EmbedGroup();
            $groupEmbede->setMember($v->getEmbedMember());
            $x = array_merge($v->getMaster()->getMappingArray(), $groupEmbede->getModel());

            foreach ($v->getAksesoris() as $row) {
                $row = (string) $row;
                $x = array_merge($x, array(array("name" => $row)));
            }
            $auModels = $x;
        }
      //  $hasil->setData($auModels);
        return $auModels;
    }
    
    /*added 14 february 2014*/
    public function getMasterData(Master_Box_Models_App_Masterdata_Main $main){
        $main->retrieveData($this);
    }

}

?>
