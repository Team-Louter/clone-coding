n=int(input())
num=0
sum=0

for i in range(1,n+1):
  num=0
  for j in range(1,i+1):
    if i%j==0:
      num+=1
  if num==2:
    sum+=1
print(f'소수의 개수는 {sum}개')