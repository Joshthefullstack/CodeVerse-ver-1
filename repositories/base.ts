
export abstract class BaseRepository<T> {
    constructor(protected readonly client: any, private readonly table: string) {}

    async UpdateEntityById(fields: Partial<T>, idField: string, id: number): Promise<T> {
        try{
            const keys = Object.keys(fields);
            const values = Object.values(fields);
            
            const setClause = keys.map((key, i) => `${key}=$${i + 1}`).join(", ");
            const query = `UPDATE ${this.table} SET ${setClause} WHERE ${idField}=$${keys.length + 1} RETURNING *`;
    
            const result = await this.client.query(query, [...values, id]);
            return result.rows[0];
        } catch(err){
            throw err;
        }  
    }


    async AddEntity(fields: Partial<T>) : Promise<T> {
        try{
            const keys = Object.keys(fields);
            const values = Object.values(fields);
    
            const setKeyClause = keys.map((key, i) => `${key}`).join(", ");
            const setKeyNumberClause = keys.map((key, i) => `${i + 1}`).join(", ");
            const query = `INSERT INTO ${this.table} (${setKeyClause}) VALUES (${setKeyNumberClause}) RETURNING *`;
    
            const result = await this.client.query(query, [...values]);
    
            return result.rows[0];
        } catch(err){
            throw err;
        }
    }

    async FindEntity(field: string, fieldVal: any) : Promise<T> {
        try{
            const query = `SELECT * FROM ${this.table} WHERE ${field} = $1`;
    
            const result = await this.client.query(query, [fieldVal]);
            return result.rows[0];
        } catch(err){
            throw err;
        }
    }

    async FindAllEntity() : Promise<T> {
        try{
            const query = `SELECT * FROM ${this.table}`;
    
            const result = await this.client.query(query);
            return result.rows[0];
        } catch(err){
            throw err;
        }
    }

    async DeleteEntity(idField: string, id: number) : Promise<T> {
        try{
            const query = `DELETE FROM ${this.table} WHERE ${idField} = $1 RETURNING *`;

            const result = await this.client.query(query, [id]);
            return result.rows[0];
        } catch(err){
            throw err;  
        }
    }

}