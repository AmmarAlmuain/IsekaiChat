import Realm from "realm"

const config = useRuntimeConfig()

const realmApp = new Realm.App({
    id: config.realmId
})

export default realmApp