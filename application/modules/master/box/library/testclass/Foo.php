<?php

/**
 * Description of Foo
 *
 * @author MIS
 */
class Erems_Box_Library_Testclass_Foo {

    public function show() {
        echo "Hello world!!";
    }
    
    /**
     *@return new Object
     */
    public function create($className=''){
        switch($className){
            case 'scheduletype':
                return new Erems_Models_Master_ScheduleType();
            break;
            case 'cluster':
               
                return NULL;
            break;
            default:
                return NULL;
            break;
        }
        
    }

}

?>
