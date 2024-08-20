<?php


/**
 * Description of Parameter
 *
 * @author MIS
 */
abstract class Hrd_Models_Parameter_Parameter {
    private $decan;
    protected $members;
    protected $session;
    private $hasil;
    
    public function __construct(Box_Models_App_Session $session) {
        $params = $this->getParams();
       
        $de = new Box_Delien_DelimiterEnhancer();
        $idAr = $this->getParams();
      
        $decan = new Box_Models_App_DecanString($idAr);
        $de->setDelimiterCandidate($decan);
        $de->generate();
   
        $this->decan = $decan;
        $this->session = $session;
        $this->acquireFromDb();
         
        $this->fillData();
      
    }
    
    protected function acquireFromDb(){
        $paramsDao = new Hrd_Models_Master_ParameterDao();
        $hasil = $paramsDao->getList($this->getDecan(),$this->session);
        
        $this->hasil = $hasil;
        $this->processDbResult($hasil);
        
    }

    public function getHasil(){
        return $this->hasil;
    }

    public function getDecan(){
        return $this->decan;
    }
    
    protected function processDbResult($hasil){
        
        if($hasil[0][0]["totalRow"] > 0){
              
            $hasil = $hasil[1];
            $this->members = array();
            foreach ($hasil as $row){
                $x = new Hrd_Models_Master_Parameter();
                $x->setArrayTable($row);
                $this->members[] = $x;
            }
        }
    }
    
    public function fillData() {
        
        if($this->members){
            foreach ($this->members as $row){
              
                $this->fill($row);
            }
        }
    }
    
    public function getMembers(){
        return $this->members;
    }

    abstract function fill(Hrd_Models_Master_Parameter $parameter);
    abstract function getParams();

}

?>
