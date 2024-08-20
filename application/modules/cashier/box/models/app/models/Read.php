<?php

/**
 * Description of Read
 *
 * @author MIS
 */
class Cashier_Box_Models_App_Models_Read extends Cashier_Box_Models_App_AbModel {

    private static $paramMode = 'request_models';
    private $request;
    private $dataList = array();
    protected $hasil;
    /* added 12 Dec 2013
     * @type string
     */
    private $currentDataList; 

    public function __construct($controller, $debug = '') {
        $this->hasil = new Cashier_Box_Models_App_HasilRead();
        parent::__construct($controller, $debug);
        $this->request = new Cashier_Box_Models_App_HasilRequestRead($this->getData());
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
        $this->currentDataList = (string)$currentDataList;
    }
    
    /*@return void 
     * 
     */
    public function setAksesorisValue($name,$value){
        $x = $this->currentDataList;
        if(array_key_exists($x, $this->dataList)){
            $y = $this->hasil->getData();
            $y[0][$name] = $value;
            $this->hasil->setData($y);
        }
        
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
                    
                    $x[] = $row->getArrayEmbed();
                }
                $row = $dl->getTotalRow();
                
                
            }

            $this->hasil->setTotalRow($row);
            $this->hasil->setData($x);
            
        }
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

    public function registerDataList($nama, Cashier_Box_Kouti_AbDataList $dataList) {
        $this->dataList[$nama] = $dataList;
    }

    protected function prosesHasilBeforeRun() {
        $hasil = $this->getInnerHasil();
        $data = $this->getData();
        $r = $this->getRequest();
        if ($r->getModeRead() == self::$paramMode) {
            $hasil = $this->getHasil();

            $dl = $this->getDataList();
            $auModels = array();
            foreach ($dl as $k => $v) {

                $groupEmbede = new Cashier_Box_Models_App_EmbedGroup();
                $groupEmbede->setMember($v->getEmbedMember());
                $x = array_merge($v->getMaster()->getMappingArray(), $groupEmbede->getModel());

                foreach ($v->getAksesoris() as $row) {
                    $row = (string) $row;
                    $x = array_merge($x, array(array("name" => $row)));
                }
                $auModels[$k] = $x;
            }
            $hasil->setData($auModels);
            $this->setInnerHasil($hasil);
        }
    }

}

?>
