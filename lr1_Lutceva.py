import numpy as np
import random
import matplotlib.pyplot as plt

Q = 30              # количество поколений
MAX_ENT = 10        # максимум сущностей в поколении
MAX_CH = 4          # количетво детей в поколении
N = 16              # длинна хромосомы
section = [0, 35]   # отрезок

# заполенение начального поколения
entity = [[random.randint(0, 1) for j in range(N)] for i in range(MAX_ENT)]
# print(entity)

# Функция фитнеса
def fitness(x):
    return np.sin(x) * (x - 6) * (x - 2) * (x - 10)

# перевод по методу Грея
def metodGray(cromosome):
    decimal_value = 0
    
    for i in range(len(cromosome)):
        decimal_value += cromosome[i]*(2**i)
    x = section[0] + decimal_value * (section[1]-section[0]) / (2**N -1)

    return x

# разметка точек на графике
def plot_some(population, ax):
    xx = []
    yy = []
    for i in range(MAX_ENT):
        x = metodGray(population[i])
        xx.append(x)
        y = np.sin(x) * (x - 6) * (x - 2) * (x - 10)
        yy.append(y)
    ax.scatter(xx, yy, s=20 , color='red')
    ax.grid()

population1 = []
population5 = []
# цикл поколений
for p in range(Q):
    # функция фитнеса для каждого организма 
    fit = [0 for _ in range(MAX_ENT)]
    for i in range(MAX_ENT):
        x = metodGray(entity[i])
        fit[i] = fitness(x)
    print('max fitness = ', np.round(max(fit), 3), ' в поколении ', p+1)
    
    # цикл воспроизводства
    fl_parent = np.full(MAX_ENT, True)
    child1 = [0 for _ in range(N)]
    child2 = [0 for _ in range(N)]
    v = 0
    while (v < MAX_CH):
        p1 = random.randint(0, MAX_ENT-1)
        p2 = random.randint(0, MAX_ENT-1)

        if (p1 == p2):
            continue
        if not (fl_parent[p1] & fl_parent[p2]):
            continue

        point = random.randint(3, N-4)
        child1 = entity[p1][:point] + entity[p2][point:]
        child2 = entity[p2][:point] + entity[p1][point:]
        entity.append(child1)
        entity.append(child2)

        fl_parent[p1] = False
        fl_parent[p2] = False

        v += 1
    # конец цикла воспроизводства

    # мутация
    mutation_probability = 0.03 # вероятность мутации 3%
    for j in range(len(entity)):
        mutation = random.random()
        if mutation < mutation_probability:
            gen = random.randint(1, N-1)
            entity[j][gen] = 1 - entity[j][gen]
    # конец мутации
    
    # функция фитнеса для каждого организма для последующего отбора
    fit = [0 for _ in range(len(entity))]
    for i in range(len(entity)):
        x = metodGray(entity[i])
        fit[i] = fitness(x)
    # print(len(fit))
    
    # отбор
    tmp_entity = []
    count_ent = len(fit)
    fl_ent = np.full(count_ent, True)
    # присвоение рангов и расчет вероятности для сущности
    sorted_ent = sorted(range(count_ent), key=lambda i: fit[i])
    ranks = [0] * count_ent
    for i, index in enumerate(sorted_ent):
        ranks[index] = i + 1
    total_weight = sum(ranks)
    probabilities = [weight / total_weight for weight in ranks]
    
    # цикл отбора по изветным вероятностям
    v = 0
    select_indexes = []
    while (v < MAX_ENT):
        choise_ent = random.choices(range(count_ent), weights=probabilities)
        
        if not fl_ent[choise_ent]:
            continue
        fl_ent[choise_ent] = False
        
        select_indexes.append(choise_ent[0])
        v += 1 
       
    tmp_entity = [entity[i] for i in select_indexes]

    entity = tmp_entity[:]
    # конец отбора

    # графики
    if (p == 0):
        population1 = entity
    elif (p == 4):
        population5 = entity

# конец поколений

# общие настройки графиков
xg = np.linspace(0, 35, num=35000)
yg = np.sin(xg) * (xg - 6) * (xg - 2) * (xg - 10)
fig = plt.figure()
ax_1 = fig.add_subplot(2, 1, 1)
ax_5 = fig.add_subplot(2, 2, 3)
ax_30 = fig.add_subplot(2, 2, 4)
ax_1.plot(xg, yg)
ax_5.plot(xg, yg)
ax_30.plot(xg, yg)
# заполнение графиков точками (сущностями)
population = entity
plot_some(population1, ax_1)
plot_some(population5, ax_5)
plot_some(population, ax_30)
plt.show()
