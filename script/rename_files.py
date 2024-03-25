import os


def rename_files_in_directory(directory):
    if not os.path.isdir(directory):
        print("Belirtilen dizin bulunamadı.")
        return

    sexs = ["Erkek", "Kadın"]

    mods = ["Olumlu", "Olumsuz"]

    for sex in sexs:
        for mod in mods:
            file_list = os.listdir(directory + sex + "/" + mod + "/")
            file_list.sort()
            count = 1
            for old_name in file_list:
                file_path = os.path.join(
                    directory + sex + "/" + mod + "/", old_name)
                if os.path.isfile(file_path):
                    file_extension = ".jpg"
                    new_name = str(count) + file_extension
                    new_path = os.path.join(directory + sex + "/" + mod + "/", new_name)
                    os.rename(file_path, new_path)
                    print(f"{old_name} -> {new_name}")
                    count += 1
                else:
                    print(f"{file_path} bulunamadı.")


directory_path = "../public/images/weekGames/week_three/cognitive_flexibility/"

rename_files_in_directory(directory_path)
