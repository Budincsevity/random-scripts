[Source](https://stackoverflow.com/questions/2995054/access-denied-for-user-rootlocalhost-using-passwordno)

```
[root ~]# service mysql stop   
[root ~]# mysqld_safe --skip-grant-tables &
[root ~]# mysql -u root

mysql> flush privileges;
mysql> grant all privileges on *.* to root@localhost identified by 'YourNewPassword' with grant option;

Empty password:
mysql> grant all privileges on *.* to root@localhost identified by '' with grant option;
```
