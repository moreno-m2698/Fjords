package howlingabysstool.howlingabysstoolapi.service;

public enum AssetSubDirEnums {
    CHAMPION("champion"),
    ITEM("item"),
    PASSIVE("passive"),
    PROFILEICON("profileicon"),
    SPELL("spell");
    final String subDir;
    AssetSubDirEnums (String subDir) {
        this.subDir = subDir;
    }
}
