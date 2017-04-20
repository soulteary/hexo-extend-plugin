#!/usr/bin/env bash

TARGET_DIR=$1;

if [ -z $TARGET_DIR ]; then
    echo "USEAGE: ./calc.sh HEXO_WEBSITE_DIR";
    exit 1;
fi

if [ ! -d ${TARGET_DIR} ]; then
    if [ ! -d "${TARGET_DIR}/node_modules" ]; then
        echo "PLEASE RUN NPM INSTALL FIRST.";
        exit 2;
    fi
fi

BASE_DIR="${TARGET_DIR}/node_modules/";

# 1
HEXO_LIB_HELPER_ENTRYPOINT="hexo/lib/plugins/helper/index.js";
ABS_PATH="${BASE_DIR}${HEXO_LIB_HELPER_ENTRYPOINT}";
BACKUP_DIR=${PWD}/backup/$(dirname "${HEXO_LIB_HELPER_ENTRYPOINT}");
mkdir -p "${BACKUP_DIR}";
cp "${ABS_PATH}" "${BACKUP_DIR}";
echo "${HEXO_LIB_HELPER_ENTRYPOINT}";
md5 -q "${ABS_PATH}";
echo "";

# 2
HEXO_LIB_PLUGIN_GENERATOR_PAGE="hexo/lib/plugins/generator/page.js";
ABS_PATH="${BASE_DIR}${HEXO_LIB_PLUGIN_GENERATOR_PAGE}";
BACKUP_DIR=${PWD}/backup/$(dirname "${HEXO_LIB_PLUGIN_GENERATOR_PAGE}");
mkdir -p "${BACKUP_DIR}";
cp "${ABS_PATH}" "${BACKUP_DIR}";
echo "${HEXO_LIB_PLUGIN_GENERATOR_PAGE}";
md5 -q "${ABS_PATH}";
echo "";

# 3
HEXO_LIB_PLUGIN_GENERATOR_POST="hexo/lib/plugins/generator/post.js";
ABS_PATH="${BASE_DIR}${HEXO_LIB_PLUGIN_GENERATOR_POST}";
BACKUP_DIR=${PWD}/backup/$(dirname "${HEXO_LIB_PLUGIN_GENERATOR_POST}");
mkdir -p "${BACKUP_DIR}";
cp "${ABS_PATH}" "${BACKUP_DIR}";
echo "${HEXO_LIB_PLUGIN_GENERATOR_POST}";
md5 -q "${ABS_PATH}";
echo "";

# 4
HEXO_LIB_PLUGIN_CONSOLE_INDEX="hexo/lib/plugins/console/index.js";
ABS_PATH="${BASE_DIR}${HEXO_LIB_PLUGIN_CONSOLE_INDEX}";
BACKUP_DIR=${PWD}/backup/$(dirname "${HEXO_LIB_PLUGIN_CONSOLE_INDEX}");
mkdir -p "${BACKUP_DIR}";
cp "${ABS_PATH}" "${BACKUP_DIR}";
echo "${HEXO_LIB_PLUGIN_CONSOLE_INDEX}";
md5 -q "${ABS_PATH}";
echo "";

# 5
HEXO_UTIL_LIB_PERMALINK="hexo-util/lib/permalink.js";
ABS_PATH="${BASE_DIR}${HEXO_UTIL_LIB_PERMALINK}";
BACKUP_DIR=${PWD}/backup/$(dirname "${HEXO_UTIL_LIB_PERMALINK}");
mkdir -p "${BACKUP_DIR}";
cp "${ABS_PATH}" "${BACKUP_DIR}";
echo "${HEXO_UTIL_LIB_PERMALINK}";
md5 -q "${ABS_PATH}";
echo "";

