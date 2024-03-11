import os


def rename_files_in_directory(directory):
    if not os.path.isdir(directory):
        print("Belirtilen dizin bulunamadı.")
        return

    mods = ["İğrenmiş", "Kızgın", "Korkmuş",
            "Mutlu", "Nötr", "Üzgün", "Şaşırmış"]

    sexs = ["Erkek", "Kadın"]

    for mod in mods:
        for sex in sexs:
            file_list = os.listdir(directory + mod + "/" + sex + "/")
            file_list.sort()
            count = 1
            for old_name in file_list:
                file_path = os.path.join(
                    directory + mod + "/" + sex + "/", old_name)
                if os.path.isfile(file_path):
                    # file_extension = os.path.splitext(old_name)[1]
                    file_extension = ".jpg"
                    new_name = str(count) + file_extension
                    new_path = os.path.join(directory + mod + "/" + sex + "/", new_name)
                    os.rename(file_path, new_path)
                    print(f"{old_name} -> {new_name}")
                    count += 1
                else:
                    print(f"{file_path} bulunamadı.")


directory_path = "/Users/altintas/Developer/NextJS/mindzone/public/images/weekGames/week_three/working_memory/"

rename_files_in_directory(directory_path)
