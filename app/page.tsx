'use client'
import { useState } from 'react';
import styles from './styles/page.module.scss';
import { Layout, Row, Col, AutoComplete, Input, Button, Card } from 'antd';
import { fetchMeals } from './api/getMeals';
import { fetchMealDetails } from './api/getMealDetails';

const { Header, Content, Footer } = Layout;

export default function App() {
    const [options, setOptions] = useState<{ value: string, label: string }[]>([]);
    const [notFound, setNotFound] = useState(false);
    const [selectedMeal, setSelectedMeal] = useState<string | null>(null);
    const [mealDetails, setMealDetails] = useState<{ name: string, instructions: string, image: string } | null>(null);

    const handleSearch = async (value: string) => {
        if (value.length >= 2) {
            const meals = await fetchMeals(value);
            setOptions(meals);
            setNotFound(meals.length === 0);
        } else {
            setOptions([]);
            setNotFound(false);
        }
    };

    const handleSelect = (value: string) => {
        setSelectedMeal(value);
    };

    const handleGetRecipe = async () => {
        if (selectedMeal) {
            const details = await fetchMealDetails(selectedMeal);
            setMealDetails(details);
        }
    };

    return (
        <Layout>
            <Header className={styles.header}>
                <Row>
                    <Col span={24} className={styles.headerCol}>
                        <h1 className={styles.title}>Meal Recipe App</h1>
                    </Col>
                </Row>
            </Header>

            <Content className={styles.content}>
                <Row>
                    <Col span={24} className={styles.inputCol}>
                        <AutoComplete
                            className={styles.autocomplete}
                            placeholder='Type a meal...'
                            onSearch={handleSearch}
                            options={options.length ? options : notFound ? [{ value: '', label: 'No matching results found' }] : []}
                            onSelect={handleSelect}
                        >
                            <Input />
                        </AutoComplete>
                    </Col>

                    <Col span={24} className={styles.buttonCol}>
                        <Button className={styles.getRecipeBtn} onClick={handleGetRecipe}>Get Recipe</Button>
                    </Col>
                </Row>

                {mealDetails && (
                    <Row>
                        <Col span={24} className={styles.mealDetailsCol}>
                            <Card>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <img
                                            alt={mealDetails.name}
                                            src={mealDetails.image}
                                            style={{ width: 300, height: 300, objectFit: 'cover' }}
                                        />
                                    </Col>
                                    <Col span={12}>
                                        <h2>{mealDetails.name}</h2>
                                        <p>{mealDetails.instructions}</p>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                )}
            </Content>
        </Layout>
    );
}
