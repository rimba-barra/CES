<?php

/**
 * Description of User
 *
 * @author MIS
 */
class Erems_Models_Customer_User extends Erems_Box_Models_ObjectEmbedData {
    private $name;
    private $password;
    
    public function getName() {
        return $this->name;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function getPassword() {
        return $this->password;
    }

    public function setPassword($password) {
        $this->password = $password;
    }
    
    public function setArrayTable($dataArray=NULL) {
        $x = $dataArray==NULL?$this->arrayTable:$dataArray;
        
        if(isset ($x['userid'])){
           $this->setName($x['userid']); 
        }
        if(isset ($x['password'])){
           $this->setPassword($x['password']); 
        }
        
        unset($x);
        
    }
    
    public function getArrayTable(){
        $x = array(
            "userid"=>$this->getName(),
            "password"=>$this->getPassword()
        );
      
        return $x;
    }


}

?>
