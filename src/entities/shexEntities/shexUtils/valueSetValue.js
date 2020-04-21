import TypesFactory from '../types/typesFactory';
import PrefixedIri from '../types/concreteTypes/prefixedIri';
import Prefix from './prefix';

class ValueSetValue {

     constructor(id,type=new PrefixedIri(new Prefix('wd','http://www.wikidata.org/entity/')),label=''){
        this.id = id;
        this.type = type;
        this.label = label;
        this.factory = new TypesFactory();
    }

    getType(){
        return this.type;
    }

    setType(type){
       this.type = this.factory.createType(type);
     }

    toString(){
        return this.type.toString();
    }

}

export default ValueSetValue;