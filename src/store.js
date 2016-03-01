const storage = window.localStorage;

class Store {
    /**
     * Creates instance of store on the top of localStorage
     * @param storeId - id to store items inside localStorage
     * @param migrations - array of migrations to apply. Every migration should have "isApplicable" and "apply" functions
     */
    constructor(storeId, migrations = []) {
        this.storeId = storeId;
        this.applyMigrations(migrations);
    }

    set(data) {
        storage.setItem(this.storeId, JSON.stringify(data))
    }

    get() {
        const rawData = storage.getItem(this.storeId);
        return JSON.parse(rawData);
    }

    applyMigrations(migrations) {
        const initialData = this.get();
        const hasMigrationsToApply = migrations.some(m => m.isApplicable(initialData));

        if (hasMigrationsToApply) {
            const migratedData = migrations.reduce((data, migration) => {
                return migration.isApplicable(data) ? migration.apply(data) : data;
            }, initialData);

            this.set(migratedData);
        }

    }
}

export default Store;
