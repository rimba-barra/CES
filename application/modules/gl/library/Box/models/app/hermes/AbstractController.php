<?php

/**
 * Description of AbstractController
 *
 * @author MIS
 */
abstract class Gl_Box_Models_App_Hermes_AbstractController extends Gl_Box_Models_App_Controller {
    private $processor;
    private $app;
    

    public function __construct(\Zend_Controller_Request_Abstract $request, \Zend_Controller_Response_Abstract $response, array $invokeArgs = array()) {
        parent::__construct($request, $response, $invokeArgs);
    
        $this->processor = $this->getDefaultProcessor();
        $this->processor->setIsDebug($this->testingFlag());
    }
    function readAction() {
        $this->processor->doRead($this);
    }

    

    function createAction() {
        $this->processor->doCreate($this);
    }

    function updateAction() {
        /*added 6 Mei 2014*/
        $this->processor->doCreate($this);
    }

    function deleteAction() {
        $this->processor->doDelete($this);
        
    }
    
  

    protected function selectedRequestor(Gl_Box_Kouti_Requestor $requestor) {
        return $requestor->debugFunct();
    }
    
    
    
    protected function getAppRequest(){
        return $this->processor->getRequest();
    }
    
    protected function getAppSession() {
        return $this->processor->getSession();
    }
    
    protected function getAppData(){
        return $this->processor->getData();
    }
    
    


    /*@return Gl_Box_Models_App_Hermes_Processor
     * 
     */
    protected function getDefaultProcessor(){
        return new Gl_Box_Models_App_Hermes_Processor();
    }
    
    public function setApp(Gl_Box_Models_App_AbModel $app){
        $this->app = $app;
    }
    
    protected function getApp(){
        return $this->app;
    }
    
    protected function getProcessor(){
        return $this->processor;
    }
    
    /*added 18 Juni 2014
     * Otomatis set array table untuk yg semua yg mempunyai relasi ke object - object lain one to one
     */
    protected function setArrayTable(Gl_Box_Kouti_Remora $remora,$data) {

        $converter = new Gl_Box_Models_App_Converter($data);
        $a = $remora->grouped();
        $converter->process($a);
        $remora->fillData($data);
    }

    protected function fillData($data, & $filledArray, Gl_Box_Models_App_Creator $creator, $creatorName, $creatorParams = NULL) {
        if (count($data) > 0) {
            foreach ($data as $record) {

                $obj = $creator->create($creatorName, $creatorParams);
                $obj->setArrayTable($record);
                $filledArray[] = $obj;
            }
        }

        /* if jumlah filledArray = 0 maka isi dengan 1 data dummy  */
        if (count($filledArray) == 0) {
            $filledArray[] = $creator->create($creatorName, $creatorParams);
        }
    }

    /* @return boolean */

    abstract protected function testingFlag();
}

?>
