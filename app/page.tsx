'use client'
import { useState } from 'react';
import styles from './styles/page.module.scss';
import { Layout, Row, Col, AutoComplete, Input, Button, Card, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { fetchMeals } from './api/getMeals';
import { fetchMealDetails } from './api/getMealDetails';

const { Header, Content, Footer } = Layout;

export default function App() {
    const [options, setOptions] = useState<{ value: string, label: string }[]>([]);
    const [notFound, setNotFound] = useState(false);
    const [selectedMeal, setSelectedMeal] = useState<string | null>(null);
    const [mealDetails, setMealDetails] = useState<{ name: string, instructions: string, image: string } | null>(null);
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleSearch = async (value: string) => {
        setInputValue(value);
        if (value.length >= 2) {
            const meals = await fetchMeals(value);
            setOptions(meals);
            setNotFound(meals.length === 0);
        } else {
            setOptions([]);
            setNotFound(false);
            setSelectedMeal(null);
        }
    };

    const handleSelect = (value: string) => {
        setSelectedMeal(value);
    };

    const handleGetRecipe = async () => {
        if (selectedMeal) {
            setLoading(true);
            const details = await fetchMealDetails(selectedMeal);
            setMealDetails(details);
            setLoading(false);
        }
    };

    return (
        <Layout className={styles.layout}>
            <Header className={styles.header}>

                <h1 className={styles.title}>Meal Recipe App</h1>

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
                        <Button
                            className={styles.getRecipeBtn}
                            onClick={handleGetRecipe}
                            disabled={!selectedMeal}
                        >
                            Get Recipe
                        </Button>
                    </Col>
                </Row>

                {loading && (
                    <Row className={styles.loadingRow}>
                        <Col span={24} className={styles.loadingCol}>
                            <Spin indicator={<LoadingOutlined spin style={{ fontSize: '64px', color: '#fff' }} />} size="large" />
                        </Col>
                    </Row>
                )}

                {!loading && mealDetails && (
                    <Row className={styles.cardRow}>
                        <Col span={24} className={styles.mealDetailsCol}>
                            <Card className={styles.recipeCard}>
                                <Row gutter={16}>
                                    <Col span={12} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <img
                                            alt={mealDetails.name}
                                            src={mealDetails.image}
                                            style={{ width: 330, height: 330, objectFit: 'cover', border: '2px solid #fff', borderRadius: '36px' }}
                                        />
                                    </Col>
                                    <Col span={12} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexDirection: 'column',
                                        gap: '3rem'
                                    }}>
                                        <h2 style={{color: '#ffff'}}>{mealDetails.name}</h2>
                                        <p style={{color: '#ffff'}}>{mealDetails.instructions}</p>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                )}
            </Content>

            <Footer className={styles.footer}>
                <Row>
                    <Col>
                        <h2 className={styles.footerText} onClick={() => { window.open('https://github.com/b-arslan/MealRecipeWebApp') }}>Get the code</h2>
                    </Col>
                </Row>
            </Footer>
        </Layout>
    );
}